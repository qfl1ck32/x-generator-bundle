import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { CollectionLinkModel } from "../models/CollectionLinkModel";

export class CollectionLinkWriter extends BlueprintWriter<CollectionLinkModel> {
  write(model: CollectionLinkModel, session: IBlueprintWriterSession) {
    const microserviceDir = FSUtils.getNearest("microservice");
    const fsOperator = new FSOperator(session, model);
    const collectionTpls = FSUtils.getTemplatePathCreator("collection");

    const aLinksPath = path.join(
      path.dirname(model.collectionAElement.absolutePath),
      model.collectionAElement.identityNameRaw + ".links.ts"
    );

    const blinksPath = path.join(
      path.dirname(model.collectionBElement.absolutePath),
      model.collectionBElement.identityNameRaw + ".links.ts"
    );

    fsOperator.sessionAppendFile(
      aLinksPath,
      fsOperator.getContents(collectionTpls("links/collectionA.links.ts.tpl"))
    );

    fsOperator.sessionPrependFile(aLinksPath, model.importCollectionBLine);

    fsOperator.sessionAppendFile(
      blinksPath,
      fsOperator.getContents(collectionTpls("links/collectionB.links.ts.tpl"))
    );

    fsOperator.sessionPrependFile(blinksPath, model.importCollectionALine);

    session.afterCommit(() => {
      console.log(
        `\nPlease ensure that your database model files and GraphQL types are updated accordingly.\n`
      );
    });
  }
}
