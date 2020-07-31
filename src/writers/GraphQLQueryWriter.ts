import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { GraphQLInputModel } from "../models/GraphQLInputModel";
import { ModelRaceEnum, GenericFieldTypeEnum } from "../models/defs";
import { GenericModel } from "../models";
import { GraphQLMutationModel } from "../models/GraphQLMutationModel";
import { GraphQLQueryModel } from "../models/GraphQLQueryModel";

export class GraphQLMutationWriter extends BlueprintWriter<GraphQLQueryModel> {
  write(model: GraphQLQueryModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    const bundlePath = FSUtils.bundlePath(microserviceDir, model.bundleName);
    const fsOperator = new FSOperator(session, model);

    const graphqlTpls = fsOperator.getTemplatePathCreator("graphql");

    // Extend the graphql types from mutations/index.graphql

    fsOperator.sessionMergeTypeDefs(
      graphqlTpls("query.graphql.tpl"),
      path.join(bundlePath, "graphql", "index.graphql")
    );

    const resolverTargetPath = path.join(
      bundlePath,
      "graphql",
      "queries",
      model.queryName + ".resolvers.ts"
    );

    model.resolverTargetPath = resolverTargetPath;

    fsOperator.sessionCopy(
      graphqlTpls("query.resolvers.ts.tpl"),
      resolverTargetPath
    );
  }
}
