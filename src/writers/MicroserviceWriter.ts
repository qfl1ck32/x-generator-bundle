import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import {
  MicroserviceModel,
  MicroserviceTypeEnum,
  CreateBundleModel,
} from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { writeNewBundle } from "./CreateBundleWriter";

export class MicroserviceWriter extends BlueprintWriter<MicroserviceModel> {
  write(model: MicroserviceModel, session: IBlueprintWriterSession) {
    model.projectName = FSUtils.getProjectName();

    const fsOperator = new FSOperator(session, model);
    const tpl = fsOperator.getTemplatePathCreator("microservice");
    const projectDir = FSUtils.getNearest("project");

    const microserviceDir = path.join(projectDir, "microservices", model.name);
    fsOperator.sessionCopy(tpl(model.type), microserviceDir);

    // If it's a backend we also create a backend module
    if (model.type === MicroserviceTypeEnum.BACKEND) {
      const bundleModel = new CreateBundleModel();
      bundleModel.bundleName = "app";
      writeNewBundle(session, bundleModel, microserviceDir);
    }

    session.afterCommit(() => {
      console.log("Your microservice is now ready!");
    });
  }
}
