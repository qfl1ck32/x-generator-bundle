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

export class GraphQLEntityWriter extends BlueprintWriter<GraphQLInputModel> {
  write(model: GraphQLInputModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    const genericModel = model.genericModel;

    if (genericModel.fields.length === 0) {
      // It will fail to parse the type without any field
      genericModel.fields.push({
        isMany: false,
        isOptional: true,
        name: "example",
        type: GenericFieldTypeEnum.STRING,
      });
    }

    this.createGraphQLEntity(
      session,
      microserviceDir,
      model.bundleName,
      model.genericModel
    );
  }

  createGraphQLEntity(
    session: IBlueprintWriterSession,
    microserviceDir: string,
    bundleName: string,
    model: GenericModel
  ) {
    const modelTpls = FSUtils.getTemplatePathCreator("model");

    const entityOperator = new FSOperator(session, model);
    const graphqlDir = FSUtils.bundlePath(
      microserviceDir,
      bundleName,
      "graphql"
    );
    entityOperator.sessionCopy(
      modelTpls("graphql/model.graphql.ts.tpl"),
      path.join(graphqlDir, `entities/${model.name}/${model.name}.graphql.ts`)
    );
    entityOperator.sessionCopy(
      modelTpls("graphql/model.resolvers.ts.tpl"),
      path.join(graphqlDir, `entities/${model.name}/${model.name}.resolvers.ts`)
    );
  }
}
