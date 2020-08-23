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
import { UnitTestModel } from "../models/UnitTestModel";

export class UnitTestWriter extends BlueprintWriter<UnitTestModel> {
  write(model: UnitTestModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const testTpls = fsOperator.getTemplatePathCreator("unit-tests");
    const microserviceDir = FSUtils.getNearest("microservice");
    const bundlePath = FSUtils.bundlePath(microserviceDir, model.bundleName);
    const testsPath = path.join(bundlePath, "__tests__");

    // TODO, allow for queries, mutations, collections as well
    model.testTargetPath = path.join(
      testsPath,
      model.element.identityNameRaw + ".service.test.ts"
    );

    fsOperator.sessionCopy(
      testTpls("service.test.ts.tpl"),
      path.join(testsPath, model.element.identityNameRaw + ".service.test.ts")
    );

    // fsOperator.sessionAppendFile(
    //   path.join(servicesDir, "index.ts"),
    //   `export * from "./${model.serviceName}.service"`
    // );
  }
}
