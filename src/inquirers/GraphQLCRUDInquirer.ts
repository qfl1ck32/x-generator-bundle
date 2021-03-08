import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import * as _ from "lodash";
import { ContainerInstance, Inject } from "@kaviar/core";
import { InquiryUtils } from "../utils/InquiryUtils";
import { XElements, XElementType } from "../utils/XElements";
import { GraphQLCRUDModel } from "../models/GraphQLCRUDModel";

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
      "graphqlEntityElement",
      XElementType.GRAPHQL_ENTITY
    );

    await this.prompt(
      "hasSubscriptions",
      Shortcuts.confirm("Enable subscriptions?", true)
    );
  }
}
