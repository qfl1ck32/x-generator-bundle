import { Service, Inject, ContainerInstance } from "@kaviar/core";
import { DatabaseService } from "@kaviar/mongo-bundle";
import { EJSON } from "@kaviar/ejson";
import { PasswordService } from "@kaviar/password-bundle";
import { PermissionService, SecurityService } from "@kaviar/security-bundle";

import dataMap from "./{{ fixtureName }}.dataMap";

@Service()
export class {{ fixtureClass }} {
  @Inject()
  passwordService: PasswordService;

  @Inject()
  permissionService: PermissionService;

  @Inject()
  databaseService: DatabaseService;

  async init() {
    if (!(await this.shouldRun())) {
      return;
    }

    await this.clean();
    console.log(`Running app fixtures.`);

    for (const collectionName in dataMap) {
      const collection = this.databaseService.getMongoCollection(
        collectionName
      );
      const documents = dataMap[collectionName].map((document) =>
        EJSON.fromJSONValue(document)
      );
      await collection.insertMany(documents);

      console.log(`Added fixtures for ${collectionName}`);
    }

    if (dataMap["users"]) {
      await this.handleUsers();
    }

    console.log(`Completed app fixtures.`);
  }

  async clean() {
    for (const collectionName in dataMap) {
      const collection = this.databaseService.getMongoCollection(
        collectionName
      );
      await collection.deleteMany({});
    }
    await this.databaseService.getMongoCollection("permissions").deleteMany({});
  }

  async handleUsers() {
    const usersCollection = this.databaseService.getMongoCollection("users");
    const users = await usersCollection.find({}).toArray();

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userId = user._id;
      const email = user.email || `user-${i}@kaviarjs.com`;
      const permission = user.roles[0] || `ADMIN`;

      await this.passwordService.attach(userId, {
        email,
        username: email,
        isEmailVerified: true,
        password: "kaviar",
      });

      await this.permissionService.add({
        domain: "app",
        userId,
        permission: permission,
      });

      // These type of fixtures are generated for mobile apps from excel
      // Currently we have no intelligent way to extract profile from excel
      // Adding the firstName and lastName so X-Password bundle reads it properly when sending default emails
      let firstName = `John ${i}`,
        lastName = `Doe`;
      if (user.firstName && user.lastName) {
        firstName = user.firstName;
        lastName = user.lastName;
      }

      if (user.fullName) {
        const [_firstName, ..._lastNames] = user.fullName.split(" ");
        (firstName = _firstName), (lastName = _lastNames.join(" "));
      }

      usersCollection.updateOne(
        { _id: userId },
        {
          $set: {
            isEnabled: true,
            createdAt: new Date(),
            profile: {
              firstName: firstName,
              lastName: lastName,
            },
          },
          $unset: {
            fullName: 1,
            roles: 1,
            email: 1,
          },
        }
      );

      console.log(`Created new login ${email}:kaviar`);
    }
  }

  // Runs if all data maps are empty
  async shouldRun() {
    for (const collectionName in dataMap) {
      const collection = this.databaseService.getMongoCollection(
        collectionName
      );
      if ((await collection.find().count()) === 0) {
        return true;
      }
    }

    return false;
  }
}
