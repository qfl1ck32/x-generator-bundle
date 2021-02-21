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
import { NearestElementNotFoundException } from "../exceptions/NearestElementNotFound.exception";
import { XSession } from "../utils/XSession";

export class MicroserviceWriter extends BlueprintWriter {
  write(model: MicroserviceModel, session: XSession) {
    const fsOperator = new FSOperator(session, model);
    const tpl = fsOperator.getTemplatePathCreator("microservice");

    // We can create a microservice that is not part of a project
    let microserviceDir;
    try {
      const projectDir = session.getProjectPath();
      microserviceDir = path.join(projectDir, "microservices", model.name);
      model.projectName = session.getProjectName();
    } catch (e) {
      console.log({ e });
      if (e instanceof NearestElementNotFoundException) {
        microserviceDir = path.join(process.cwd(), model.name);
        model.projectName = model.name;
      } else {
        throw e;
      }
    }

    fsOperator.sessionCopy(tpl(model.type), microserviceDir);

    // If it's a backend we also create a backend module
    if (model.type === MicroserviceTypeEnum.BACKEND) {
      const bundleModel = new CreateBundleModel();
      bundleModel.bundleName = "app";
      bundleModel.containsGraphQL = true;
      writeNewBundle(session, bundleModel, microserviceDir);
    }

    session.afterCommitInstruction(() => {
      console.log("Your microservice is now ready!");
      if (model.type === MicroserviceTypeEnum.BACKEND) {
        console.log(`cd ${model.name} ; npm update ; npm start:watch`);
      }
      if (model.type === MicroserviceTypeEnum.BACKEND) {
        console.log(`cd ${model.name} ; npm update ; npm start`);
      }
    });
  }
}
