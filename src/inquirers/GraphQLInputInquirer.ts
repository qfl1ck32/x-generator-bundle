import { Inquirer } from "@kaviar/terminal-bundle";
import { GenericModelInquirer } from "./GenericModelInquirer";
import * as _ from "lodash";
import { ContainerInstance, Inject } from "@kaviar/core";
import { InquiryUtils } from "../utils/InquiryUtils";
import { GraphQLInputModel } from "../models/GraphQLInputModel";

export class GraphQLInputInquirer extends Inquirer<GraphQLInputModel> {
  @Inject(() => ContainerInstance)
  protected container: ContainerInstance;

  model = new GraphQLInputModel();

  async inquire() {
    const modelInquirer = this.container.get(GenericModelInquirer);

    await InquiryUtils.inquireAllBundles(this);

    modelInquirer.model = this.model.genericModel;
    await modelInquirer.inquire();
  }
}
