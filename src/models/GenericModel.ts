import * as _ from "lodash";
import { ModelUtils } from "../utils/ModelUtils";
import {
  ModelRaceEnum,
  IGenericField,
  IAvailableModel,
  GenericFieldTypeEnum,
} from "./defs";

// This model can be inquired for asking:
// GraphQL Types, Inputs, Model Classes
export class GenericModel {
  race: ModelRaceEnum;
  name: string;
  fields: IGenericField[] = [];
  yupValidation: boolean = false;

  constructor(name?: string, race?: ModelRaceEnum, fields?: IGenericField[]) {
    this.name = name;
    if (race) {
      this.race = race;
    }
    if (fields) {
      this.fields = fields;
    }
  }

  // Most likely we clone it because we want to change the race
  static clone(model: GenericModel) {
    const newModel = new GenericModel();
    ["race", "name", "yupValidation"].forEach(
      (field) => (newModel[field] = model[field])
    );

    newModel.fields = [...model.fields];

    return newModel;
  }

  // To think!
  availableModels: IAvailableModel[] = [];

  getField(name: string): IGenericField {
    return this.fields.find((field) => field.name === name);
  }

  addField(field: IGenericField, first = false) {
    if (first) {
      this.fields = [...this.fields, field];
    } else {
      this.fields.push(field);
    }
  }

  hasField(name: string) {
    return Boolean(this.fields.find((f) => f.name === name));
  }

  ensureIdField() {
    if (!this.hasField("_id")) {
      this.addField({
        name: "_id",
        isOptional: false,
        type: GenericFieldTypeEnum.ID,
        isMany: false,
      });
    }
  }

  get modelTypeName() {
    switch (this.race) {
      case ModelRaceEnum.GRAPHQL_TYPE:
        return "graphql type";
      case ModelRaceEnum.CLASSLIKE:
        return "model";
      case ModelRaceEnum.GRAPHQL_INPUT:
        return "input";
    }

    return "model";
  }

  get modelName() {
    return _.upperFirst(this.name);
  }

  get modelClass() {
    return _.upperFirst(this.name) + this.modelClassSuffix;
  }

  get modelClassSuffix(): string {
    switch (this.race) {
      case ModelRaceEnum.GRAPHQL_TYPE:
        return "";
      case ModelRaceEnum.CLASSLIKE:
        return "";
      case ModelRaceEnum.GRAPHQL_INPUT:
        return "Input";
    }

    return "";
  }

  get graphqlContents(): string {
    let result = "";
    this.fields.forEach((field) => {
      result += ModelUtils.getFieldSignatureForGraphQL(field) + "\n";
    });

    return result;
  }

  get tsContents(): string {
    let result = "";
    this.fields.forEach((field) => {
      if (this.yupValidation) {
        result += ModelUtils.getYupValidatorDecorator(field) + "\n";
      }
      result += ModelUtils.getFieldSignatureForTS(field) + "\n";

      if (this.yupValidation) {
        // A decorator would need more space to be visibly attractive
        result += "\n";
      }
    });

    return result;
  }
}
