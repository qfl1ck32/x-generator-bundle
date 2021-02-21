import * as _ from "lodash";
import { ModelUtils } from "../utils/ModelUtils";
import {
  ModelRaceEnum,
  IGenericField,
  GenericFieldTypeEnum,
  IGenericFieldSubModel,
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

  getField(name: string): IGenericField {
    return this.fields.find((field) => field.name === name);
  }

  addField(field: IGenericField, first = false) {
    // Ensure uniqueness of name
    if (this.hasField(field.name)) {
      throw new Error(
        `You have already added the field with name: ${field.name}`
      );
    }

    if (first) {
      this.fields = [field, ...this.fields];
    } else {
      this.fields.push(field);
    }
  }

  removeField(fieldName: string) {
    this.fields = this.fields.filter((field) => field.name !== fieldName);
  }

  hasField(name: string): boolean {
    return Boolean(this.fields.find((f) => f.name === name));
  }

  ensureIdField(): void {
    if (!this.hasField("_id")) {
      this.addField(
        {
          name: "_id",
          isOptional: false,
          type: GenericFieldTypeEnum.ID,
          isMany: false,
        },
        true
      );
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

  toGraphQL = () => {
    return this.graphqlContents(this.fields);
  };

  toGraphQLSubmodel = (model: IGenericFieldSubModel) => {
    return this.graphqlContents(model.fields);
  };

  toTypescript = () => {
    return this.tsContents(this.fields);
  };

  toTypescriptSubmodel = (model: IGenericFieldSubModel) => {
    return this.tsContents(model.fields);
  };

  graphqlContents(fields: IGenericField[]): string {
    let result = "";
    fields
      .filter((field) => !field.ignoreGraphQL)
      .forEach((field) => {
        if (field.type === GenericFieldTypeEnum.ENUM) {
          result +=
            ModelUtils.getEnumSignatureForGraphQL(field, this.modelClass) +
            "\n";
        } else {
          result += ModelUtils.getFieldSignatureForGraphQL(field) + "\n";
        }
      });

    return result;
  }

  tsContents(fields: IGenericField[]): string {
    let result = "";

    fields
      .filter((field) => !field.ignoreTypeScript)
      .forEach((field) => {
        if (this.isFieldPartOfSubmodel(field)) {
          console.error({ field });
          throw new Error("We do not allow fields that contain a dot.");
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

  get models(): Array<{
    bundle?: string;
    className: string;
  }> {
    return this.fields
      .filter((field) => this.isFieldModel(field))
      .map((field) => {
        return {
          className: field.type,
          bundle: field.model?.referenceBundle,
        };
      });
  }

  get remoteModels(): IGenericFieldSubModel[] {
    return this.fields
      .filter((field) => {
        return (
          field.model?.storage === "outside" && field.model?.local === false
        );
      })
      .map((field) => field.model);
  }

  get localModels(): IGenericFieldSubModel[] {
    return this.fields
      .filter((field) => {
        return (
          field.model?.storage === "outside" && field.model?.local === true
        );
      })
      .map((field) => field.model);
  }

  get embeddedModels(): IGenericFieldSubModel[] {
    return this.fields
      .filter((field) => {
        return field.model?.storage === "embed";
      })
      .map((field) => field.model);
  }

  /**
   * The logic here is that if the field is not inside the GenericFieldTypeEnum it's definitely a model.
   * @param field
   */
  isFieldModel(field: IGenericField): boolean {
    return ModelUtils.isFieldModel(field);
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
