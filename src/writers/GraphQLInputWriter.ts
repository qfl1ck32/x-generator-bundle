import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { GraphQLInputModel } from "../models/GraphQLInputModel";
import { ModelRaceEnum, GenericFieldTypeEnum } from "../models/defs";

export class GraphQLInputWriter extends BlueprintWriter<GraphQLInputModel> {
  write(model: GraphQLInputModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model.genericModel);

    const microserviceDir = FSUtils.getNearest("microservice");
    const bundlePath = FSUtils.bundlePath(microserviceDir, model.bundleName);
    const tpl = fsOperator.getTemplatePathCreator("model");

    const genericModel = model.genericModel;
    genericModel.race = ModelRaceEnum.GRAPHQL_INPUT;
    genericModel.yupValidation = true;

    if (genericModel.fields.length === 0) {
      // It will fail to parse the type without any field
      genericModel.fields.push({
        isMany: false,
        isOptional: true,
        name: "example",
        type: GenericFieldTypeEnum.STRING,
      });
    }

    fsOperator.sessionCopy(
      tpl("graphql/input.graphql.ts.tpl"),
      path.join(
        bundlePath,
        "graphql",
        "inputs",
        genericModel.modelClass + ".graphql.ts"
      )
    );

    fsOperator.sessionCopy(
      tpl("ts/model.ts.tpl"),
      path.join(
        bundlePath,
        "services",
        "inputs",
        genericModel.modelName + ".input.ts"
      )
    );

    fsOperator.sessionAppendFile(
      path.join(bundlePath, "services", "inputs", "index.ts"),
      `export * from './${genericModel.modelName + ".input"}';`
    );
  }
}
