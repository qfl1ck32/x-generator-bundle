import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { MicroserviceModel, CreateBundleModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";

export class CreateBundleWriter extends BlueprintWriter<CreateBundleModel> {
  write(model: CreateBundleModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    writeNewBundle(session, model, microserviceDir);
  }
}

export function writeNewBundle(
  session: IBlueprintWriterSession,
  model: CreateBundleModel,
  microserviceDir: any
) {
  const fsOperator = new FSOperator(session, model);

  const tpl = fsOperator.getTemplatePathCreator("bundle");

  const bundlePath = path.join(
    microserviceDir,
    "src",
    "bundles",
    model.bundleClass
  );

  fsOperator.sessionCopy(tpl("create"), bundlePath);

  if (model.containsGraphQL) {
    fsOperator.sessionCopy(tpl("graphql"), path.join(bundlePath, "graphql"));
  }

  fsOperator.sessionAppendFile(
    path.join(bundlePath, "index.ts"),
    `export * from "./{{ bundleClass }}"`
  );

  fsOperator.sessionAppendFile(
    path.join(microserviceDir, "src", "bundles", "index.ts"),
    `export * from "./{{ bundleClass }}"`
  );

  fsOperator.sessionWrite(
    path.join(
      microserviceDir,
      "src",
      "startup",
      "bundles",
      `${model.bundleName}.ts`
    ),
    `import { {{ bundleClass }} } from "../../bundles";
       import { kernel } from '../kernel'; 

       kernel.addBundle(new {{ bundleClass}}());`
  );

  session.afterCommit(() => {
    console.log(`Bundle "${model.bundleName}" has been created.`);
  });
}
