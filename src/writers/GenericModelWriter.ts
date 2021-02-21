import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { MicroserviceModel, CreateBundleModel, GenericModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { CollectionModel } from "../models/CollectionModel";
import { XSession } from "../utils/XSession";

export class GenericModelWriter extends BlueprintWriter {
  write(model: GenericModel, session: XSession) {
    const modelOperator = new FSOperator(session, model);
    const modelTpls = FSUtils.getTemplatePathCreator("model");

    if (!model.targetPath) {
      throw new Error(
        `You are using this generic writer without providing "targetPath" to the GenericModel`
      );
    }

    modelOperator.sessionCopy(modelTpls("ts/model.ts.tpl"), model.targetPath);

    const modelDir = path.dirname(model.targetPath);
    model.enums.forEach((myEnum) => {
      const enumOperator = new FSOperator(session, myEnum);

      enumOperator.sessionCopy(
        modelTpls("ts/enum.ts.tpl"),
        path.join(modelDir, "enums", `${myEnum.className}.enum.ts`)
      );
    });
  }
}
