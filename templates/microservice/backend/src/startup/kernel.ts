import { Kernel } from "@kaviar/core";
import { ApolloBundle } from "@kaviar/apollo-bundle";
import { MongoBundle } from "@kaviar/mongo-bundle";
import { SecurityBundle } from "@kaviar/security-bundle";
import { SecurityMongoBundle } from "@kaviar/security-mongo-bundle";
import { LoggerBundle } from "@kaviar/logger-bundle";
import { XBundle } from "@kaviar/x-bundle";

export const kernel = new Kernel({
  parameters: {
    appUrl: process.env.APP_URL,
  },
  bundles: [
    new ApolloBundle({
      port: 4000,
    }),
    new MongoBundle({
      uri: "mongodb://localhost:27017/{{ projectName }}",
    }),
    new SecurityBundle(),
    new SecurityMongoBundle(),
    new LoggerBundle(),
    new XBundle(),
  ],
});
