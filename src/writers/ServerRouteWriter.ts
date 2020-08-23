import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { MicroserviceModel, CreateBundleModel, GenericModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { CollectionModel } from "../models/CollectionModel";
import { GraphQLEntityWriter } from "./GraphQLEntityWriter";
import { GraphQLInputModel } from "../models/GraphQLInputModel";
import { ModelRaceEnum } from "../models/defs";
import { ServiceModel } from "../models/ServiceModel";
import { ServerRouteModel } from "../models/ServerRouteModel";

export class ServerRouteWriter extends BlueprintWriter<ServerRouteModel> {
  write(model: ServerRouteModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const serverRouteTpls = fsOperator.getTemplatePathCreator("server-routes");
    const microserviceDir = FSUtils.getNearest("microservice");
    const serverRoutesDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "server-routes"
    );

    fsOperator.sessionCopy(
      serverRouteTpls("route.ts.tpl"),
      path.join(serverRoutesDir, `${model.name}.route.ts`)
    );

    fsOperator.sessionAppendFile(
      path.join(serverRoutesDir, "index.ts"),
      `export * from "./${model.name}.route"`
    );
  }
}
