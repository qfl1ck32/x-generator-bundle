import { GenericModel } from "./GenericModel";
import { ModelRaceEnum } from "./defs";

export class GraphQLInputModel {
  bundleName: string;
  genericModel: GenericModel = new GenericModel(
    "MyInput",
    ModelRaceEnum.GRAPHQL_INPUT
  );
}
