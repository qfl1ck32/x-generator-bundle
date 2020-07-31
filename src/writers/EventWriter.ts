import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { MicroserviceModel, CreateBundleModel, GenericModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { ServiceModel } from "../models/ServiceModel";
import { EventModel } from "../models/EventModel";

export class EventWriter extends BlueprintWriter<EventModel> {
  write(model: EventModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const serviceTpls = fsOperator.getTemplatePathCreator("event");
    const microserviceDir = FSUtils.getNearest("microservice");
    const eventsDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "events"
    );

    fsOperator.sessionCopy(
      serviceTpls("event.ts.tpl"),
      path.join(eventsDir, `${model.eventName}.event.ts`)
    );

    fsOperator.sessionAppendFile(
      path.join(eventsDir, "index.ts"),
      `export * from "./${model.eventName}.event"`
    );
  }
}
