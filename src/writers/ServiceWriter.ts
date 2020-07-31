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

export class ServiceWriter extends BlueprintWriter<ServiceModel> {
  write(model: ServiceModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const serviceTpls = fsOperator.getTemplatePathCreator("service");
    const microserviceDir = FSUtils.getNearest("microservice");
    const servicesDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "services"
    );

    fsOperator.sessionCopy(
      serviceTpls("service.ts.tpl"),
      path.join(servicesDir, `${model.serviceName}.service.ts`)
    );

    fsOperator.sessionAppendFile(
      path.join(servicesDir, "index.ts"),
      `export * from "./${model.serviceName}.service"`
    );
  }
}
