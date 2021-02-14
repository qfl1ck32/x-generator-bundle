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
import { GenericModelWriter } from "./GenericModelWriter";

export class CollectionWriter extends BlueprintWriter<CollectionModel> {
  write(model: CollectionModel, session: IBlueprintWriterSession) {
    const fsOperator = new FSOperator(session, model);

    const collectionTpls = fsOperator.getTemplatePathCreator("collection");
    const modelTpls = fsOperator.getTemplatePathCreator("model");
    const microserviceDir = FSUtils.getNearest("microservice");
    const collectionsDir = FSUtils.bundlePath(
      microserviceDir,
      model.bundleName,
      "collections"
    );

    const collectionDir = path.join(collectionsDir, model.collectionNameUpper);
    fsOperator.sessionCopy(collectionTpls("create"), collectionDir);

    const currentCollectionDir = path.join(
      collectionsDir,
      model.collectionNameUpper
    );

    model.modelDefinition.yupValidation = true;
    model.modelDefinition.targetPath = path.join(
      currentCollectionDir,
      `${model.modelDefinition.name}.model.ts`
    );

    this.getWriter<GenericModel>(GenericModelWriter).write(
      model.modelDefinition,
      session
    );

    if (model.createEntity) {
      this.getWriter<GraphQLInputModel>(GraphQLEntityWriter).write(
        {
          bundleName: model.bundleName,
          genericModel: GenericModel.clone(model.modelDefinition),
        },
        session
      );
    }

    fsOperator.sessionAppendFile(
      path.join(collectionsDir, "index.ts"),
      `export * from "./{{ collectionNameUpper }}"`
    );

    fsOperator.sessionAppendFile(
      path.join(collectionDir, "index.ts"),
      `export * from "./{{ collectionNameUpper }}.collection"
      export * from "./{{ collectionModelClass }}.model"`
    );
  }
}
