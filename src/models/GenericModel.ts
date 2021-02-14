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

  // Where should it be written
  targetPath?: string;

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
      if (field.type === GenericFieldTypeEnum.ENUM) {
        result +=
          ModelUtils.getEnumSignatureForGraphQL(field, this.modelClass) + "\n";
      } else {
        result += ModelUtils.getFieldSignatureForGraphQL(field) + "\n";
      }
    });

    return result;
  }

  get tsContents(): string {
    let result = "";
    this.fields.forEach((field) => {
      if (this.isFieldPartOfSubmodel(field)) {
        return;
      }
      if (this.yupValidation) {
        result += ModelUtils.getYupValidatorDecorator(field) + "\n";
      }
      if (field.type === GenericFieldTypeEnum.ENUM) {
        result +=
          ModelUtils.getEnumSignatureForTS(field, this.modelClass) + "\n";
      } else {
        result += ModelUtils.getFieldSignatureForTS(field) + "\n";
      }

      if (this.yupValidation) {
        // A decorator would need more space to be visibly attractive
        result += "\n";
      }
    });

    return result;
  }

  get enums(): Array<{
    className: string;
    elements: Array<{
      label: string;
      field: string;
      value: string;
    }>;
  }> {
    const enums = this.fields
      .filter((field) => {
        return field.type === GenericFieldTypeEnum.ENUM;
      })
      .map((field) => {
        return {
          className: ModelUtils.getEnumClassName(field, this.modelClass),
          elements: field.enumCSVValues.split(",").map((label) => {
            label = label.trim();
            return {
              label,
              field: _.toUpper(_.snakeCase(label)),
              value: _.kebabCase(label),
            };
          }),
        };
      });

    return enums;
  }

  /**
   * TODO: Make it create fields out of dotted fields.
   */
  get submodels(): Array<{ GenericModel }> {
    return [];
  }

  protected isFieldPartOfSubmodel(field: IGenericField) {
    return field.name.indexOf(".") >= 0;
  }
}
