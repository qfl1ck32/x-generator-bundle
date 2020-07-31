import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { CollectionLinkModel } from "../models/CollectionLinkModel";
import { ValidatorModel } from "../models/ValidatorModel";
import { YupFieldMap } from "../utils/ModelUtils";

export class ValidatorWriter extends BlueprintWriter<ValidatorModel> {
  write(model: ValidatorModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    const fsOperator = new FSOperator(session, model);
    const validatorTpls = FSUtils.getTemplatePathCreator("validator");

    const validatorsDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "validators"
    );

    fsOperator.sessionCopy(
      validatorTpls("validator.ts.tpl"),
      path.join(validatorsDir, model.validatorClassName + ".ts")
    );

    fsOperator.sessionCopy(
      path.join(validatorsDir, model.validatorClassName + ".d.ts"),
      validatorTpls("declarations.d.ts")
    );

    fsOperator.sessionAppendFile(
      path.join(validatorsDir, "index.ts"),
      `export * from "./{{ validatorClassName }}"`
    );
  }
}
