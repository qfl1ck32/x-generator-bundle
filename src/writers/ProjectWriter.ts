import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { ProjectModel } from "../models";
import { FSOperator } from "../utils/FSOperator";

export class ProjectWriter extends BlueprintWriter<ProjectModel> {
  write(model: ProjectModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);
    const tpl = fsOperator.getTemplatePathCreator("/project");

    fsOperator.sessionCopy(tpl(), `${model.name}`);
  }
}
