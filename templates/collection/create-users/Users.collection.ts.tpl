import { Behaviors } from "@kaviar/mongo-bundle";
import { UsersCollection as BaseCollection } from "@kaviar/security-mongo-bundle";
import * as links from "./Users.links";
import * as reducers from "./Users.reducers";
import { User } from "./User.model";

export class UsersCollection extends BaseCollection<User> {
  static collectionName = "users";
  static model = User;

  static links = links;
  static reducers = reducers;

  static behaviors = [Behaviors.Timestampable(), Behaviors.Blameable()];

  // Create an array of indexes
  static indexes = [{ key: { createdAt: 1 } }, { key: { createdBy: 1 } }];
}
