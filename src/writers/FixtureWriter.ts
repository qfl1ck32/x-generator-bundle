import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { FixtureModel } from "../models/FixtureModel";

export class FixtureWriter extends BlueprintWriter<FixtureModel> {
  write(model: FixtureModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    const fsOperator = new FSOperator(session, model);
    const fixtureTpls = FSUtils.getTemplatePathCreator("fixture");

    const fixturesDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "fixtures"
    );

    const fixtureTargetPath = path.join(
      fixturesDir,
      `${model.fixtureName}.fixture.ts`
    );
    model.targetPath = fixtureTargetPath;

    fsOperator.sessionCopy(
      fixtureTpls("fixture.ts.tpl"),
      path.join(fixturesDir, `${model.fixtureName}.fixture.ts`)
    );

    fsOperator.sessionAppendFile(
      path.join(fixturesDir, "index.ts"),
      `export * from "./${model.fixtureName}.fixture"`
    );
  }
}
