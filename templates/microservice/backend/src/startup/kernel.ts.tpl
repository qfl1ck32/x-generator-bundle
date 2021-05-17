import { Kernel } from "@kaviar/core";
import { ApolloBundle } from "@kaviar/apollo-bundle";
import { MongoBundle } from "@kaviar/mongo-bundle";
import { SecurityBundle } from "@kaviar/security-bundle";
import { SecurityMongoBundle } from "@kaviar/security-mongo-bundle";
import { LoggerBundle } from "@kaviar/logger-bundle";
import { XBundle } from "@kaviar/x-bundle";
import { ApolloSecurityBundle } from "@kaviar/apollo-security-bundle";
import { PasswordBundle } from "@kaviar/password-bundle";
import { XPasswordBundle } from "@kaviar/x-password-bundle";
import { EmailBundle } from "@kaviar/email-bundle";
import { ValidatorBundle } from "@kaviar/validator-bundle";
{{# if hasUsers }}
  import { UsersCollection } from "../bundles/AppBundle/collections";
{{/ if }}
import env from "./env";

export const kernel = new Kernel({
  parameters: {
    context: env.CONTEXT,
    debug: false,
  },
  bundles: [
    new LoggerBundle(),
    new ValidatorBundle(),
    new ApolloBundle({
      port: env.ROOT_PORT,
      url: env.ROOT_URL,
      enableSubscriptions: true,
    }),
    new MongoBundle({
      uri: env.MONGO_URL,
    }),
    new SecurityBundle(),
    new SecurityMongoBundle(
      {{# if hasUsers }}
        usersCollection: UsersCollection
      {{/ if }}
    ),
    new ApolloSecurityBundle(),
    new XBundle({
      appUrl: env.APP_URL,
      rootUrl: env.ROOT_URL,
    }),
    new EmailBundle(),
    new PasswordBundle(),
    new XPasswordBundle(),
  ],
});
