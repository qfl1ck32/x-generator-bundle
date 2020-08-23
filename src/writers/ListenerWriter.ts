import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { ListenerModel } from "../models/ListenerModel";

export class ListenerWriter extends BlueprintWriter<ListenerModel> {
  write(model: ListenerModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const listenerTpls = fsOperator.getTemplatePathCreator("listener");
    const microserviceDir = FSUtils.getNearest("microservice");
    const listenersDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "listeners"
    );

    const listenerTargetPath = path.join(
      listenersDir,
      `${model.listenerName}.listener.ts`
    );
    model.listenerTargetPath = listenerTargetPath;

    fsOperator.sessionCopy(
      listenerTpls("listener.ts.tpl"),
      path.join(listenersDir, `${model.listenerName}.listener.ts`)
    );

    fsOperator.sessionAppendFile(
      path.join(listenersDir, "index.ts"),
      `export * from "./${model.listenerName}.listener"`
    );
  }
}
