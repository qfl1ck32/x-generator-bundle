import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { CreateBundleModel, GenericModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import { CollectionModel } from "../models/CollectionModel";
import { GenericModelInquirer } from "./GenericModelInquirer";
import * as _ from "lodash";
import { ContainerInstance, Inject } from "@kaviar/core";
import { InquiryUtils } from "../utils/InquiryUtils";
import { GraphQLInputModel } from "../models/GraphQLInputModel";
import { ModelRaceEnum, GenericFieldTypeEnum } from "../models/defs";
import { GraphQLCollectionMutationOperation } from "../models/GraphQLMutationModel";
import { XElements, XElementType } from "../utils/XElements";
import { GraphQLCRUDModel } from "../models/GraphQLCRUDModel";
import {
  GraphQLMutationModel,
  MutationDelegateType,
} from "../models/GraphQLMutationModel";

export class GraphQLCRUDInquirer extends Inquirer<GraphQLCRUDModel> {
  @Inject(() => ContainerInstance)
  protected container: ContainerInstance;

  model = new GraphQLCRUDModel();

  async inquire() {
    await InquiryUtils.inquireAllBundles(this);

    await this.prompt(
      "crudName",
      Shortcuts.input("What is the CRUD's name (eg: adminUsers)")
    );

    await InquiryUtils.inquireXElement(
      this,
      "collectionElement",
      XElementType.COLLECTION
    );

    await InquiryUtils.inquireXElement(
      this,
      "collectionElement",
      XElementType.GRAPHQL_ENTITY
    );
  }
}
