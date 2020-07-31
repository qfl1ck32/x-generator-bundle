import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { CreateBundleModel, GenericModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import { CollectionModel } from "../models/CollectionModel";
import { GenericModelInquirer } from "./GenericModelInquirer";
import * as _ from "lodash";
import { ContainerInstance, Inject } from "@kaviar/core";
import { InquiryUtils } from "../utils/InquiryUtils";
import { GraphQLInputModel } from "../models/GraphQLInputModel";
import { ModelRaceEnum } from "../models/defs";

export class GraphQLEntityInquirer extends Inquirer<GraphQLInputModel> {
  @Inject(() => ContainerInstance)
  protected container: ContainerInstance;

  model = new GraphQLInputModel();

  async inquire() {
    const modelInquirer = this.container.get(GenericModelInquirer);

    await InquiryUtils.inquireAllBundles(this);

    this.model.genericModel.race = ModelRaceEnum.GRAPHQL_TYPE;
    modelInquirer.model = this.model.genericModel;
    await modelInquirer.inquire();
  }
}
