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
import { GraphQLCRUDModel } from "../models/GraphQLCRUDModel";
import { XSession } from "../utils/XSession";

export class GraphQLCRUDWriter extends BlueprintWriter {
  write(model: GraphQLCRUDModel, session: XSession) {
    const microserviceDir = session.getMicroservicePath();
    const bundlePath = FSUtils.bundlePath(microserviceDir, model.bundleName);
    const fsOperator = new FSOperator(session, model);

    const graphqlTpls = fsOperator.getTemplatePathCreator("graphql");

    // Extend the graphql types from mutations/index.graphql

    const basePath = path.join(
      bundlePath,
      "graphql",
      "modules",
      model.crudName
    );
    fsOperator.sessionCopy(
      graphqlTpls("crudModule.graphql.ts.tpl"),
      path.join(basePath, model.crudName + ".graphql.ts")
    );

    // Useful to know how to import stuffs
    const resolverTargetPath = path.join(
      basePath,
      model.crudName + ".resolvers.ts"
    );

    model.resolverTargetPath = resolverTargetPath;

    fsOperator.sessionCopy(
      graphqlTpls("crudModule.resolvers.ts.tpl"),
      resolverTargetPath
    );
  }
}
