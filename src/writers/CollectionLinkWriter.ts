import {
  BlueprintWriter,
  IBlueprintWriterSession,
} from "@kaviar/terminal-bundle";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";
import { FSOperator } from "../utils/FSOperator";
import { CollectionLinkModel } from "../models/CollectionLinkModel";
import { XSession } from "../utils/XSession";

export class CollectionLinkWriter extends BlueprintWriter {
  write(model: CollectionLinkModel, session: XSession) {
    const microserviceDir = session.getMicroservicePath();
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

    /**
     * There are situations when we don't want to specify the inversed link, simply because you may not need it.
     * When the link is stored in collection "A", then for sure we have to add the link there
     * So the logic is we process collection "A" inversed if the link from collection "B" is specified
     */

    const shouldProcessA =
      model.whereIsTheLinkStored === "A" ||
      (model.whereIsTheLinkStored === "B" && model.linkFromA !== "");

    const shouldProcessB =
      model.whereIsTheLinkStored === "B" ||
      (model.whereIsTheLinkStored === "A" && model.linkFromB !== "");

    if (shouldProcessA) {
      fsOperator.sessionAppendFile(
        aLinksPath,
        fsOperator.getContents(collectionTpls("links/collectionA.links.ts.tpl"))
      );

      fsOperator.sessionPrependFile(aLinksPath, model.importCollectionBLine);
    }

    if (shouldProcessB) {
      fsOperator.sessionAppendFile(
        blinksPath,
        fsOperator.getContents(collectionTpls("links/collectionB.links.ts.tpl"))
      );

      fsOperator.sessionPrependFile(blinksPath, model.importCollectionALine);
    }

    session.afterCommitInstruction(() => {
      console.log(
        `\nPlease ensure that your database model files and GraphQL types are updated accordingly.\n`
      );
    });
  }
}
