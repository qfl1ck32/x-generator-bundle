import * as _ from "lodash";
import { IGenericField, GenericFieldTypeEnum } from "../models/defs";

export class ModelUtils {
  static getFieldSignatureForGraphQL(field: IGenericField) {
    let signature = GraphQLFieldMap[field.type];
    if (!signature) {
      signature =
        field.type === GenericFieldTypeEnum.MODEL
          ? field.model?.name
          : field.type;
    }
    if (field.isMany) {
      signature = "[" + signature + "]";
    }
    if (!field.isOptional) {
      signature = signature + "!";
    }

    return `${field.name}: ${signature}`;
  }

  static getFieldSignatureForTS(field: IGenericField) {
    let signature;
    let fieldName = field.name;

    if (this.isFieldModel(field)) {
      if (field.model?.storage === "embed") {
        signature = field.model.fields
          .map((field) => this.getFieldSignatureForTS(field))
          .join("\n");
        signature = `{${signature}}`;
      } else {
        signature =
          field.type === GenericFieldTypeEnum.MODEL
            ? field.model?.name
            : field.type;
      }
    } else {
      signature = TSFieldMap[field.type];
    }

    if (field.isOptional) {
      fieldName = fieldName + "?";
    }

    if (field.isMany) {
      signature = signature + "[]";
    }

    return `${fieldName}: ${signature};`;
  }

  /**
   * @param field
   * @param modelClass Represents the context of enum: InvoiceStatus
   */
  static getEnumSignatureForTS(field: IGenericField, modelClass?: string) {
    let fieldName = field.name;
    if (field.isOptional) {
      fieldName = fieldName + "?";
    }
    return `${fieldName}: ${ModelUtils.getEnumClassName(field, modelClass)}`;
  }

  /**
   * @param field
   * @param modelClass Represents the context of enum: InvoiceStatus
   */
  static getEnumSignatureForGraphQL(field: IGenericField, modelClass?: string) {
    let fieldName = field.name;
    let fieldType = ModelUtils.getEnumClassName(field, modelClass);
    if (!field.isOptional) {
      fieldType = fieldType + "!";
    }

    return `${fieldName}: ${ModelUtils.getEnumClassName(field, modelClass)}`;
  }

  static getYupValidatorDecorator(field: IGenericField) {
    if (this.isFieldModel(field)) {
      return "";
    }

    const aWhat = startsWithVowel(field.name) ? "an" : "a";
    let yupType = YupFieldMap[field.type];
    const isRequired = !field.isOptional ? ".required()" : "";

    if (yupType) {
      yupType = "." + yupType + "()";
    }
    return `@Is(${aWhat}${yupType}${isRequired})`;
  }

  static getEnumClassName(field: IGenericField, modelClass?: string): string {
    return modelClass + _.capitalize(field.name);
  }

  static isFieldModel(field: IGenericField) {
    return (
      field.type === GenericFieldTypeEnum.MODEL ||
      !PRIMITIVES.includes(field.type as GenericFieldTypeEnum)
    );
  }
}

export const PRIMITIVES = [
  GenericFieldTypeEnum.BOOLEAN,
  GenericFieldTypeEnum.STRING,
  GenericFieldTypeEnum.DATE,
  GenericFieldTypeEnum.FLOAT,
  GenericFieldTypeEnum.INT,
  GenericFieldTypeEnum.OBJECT,
  GenericFieldTypeEnum.ID,
];

export const GraphQLFieldMap = {
  [GenericFieldTypeEnum.BOOLEAN]: "Boolean",
  [GenericFieldTypeEnum.STRING]: "String",
  [GenericFieldTypeEnum.DATE]: "Date",
  [GenericFieldTypeEnum.FLOAT]: "Float",
  [GenericFieldTypeEnum.INT]: "Int",
  [GenericFieldTypeEnum.OBJECT]: "JSON",
  [GenericFieldTypeEnum.ID]: "ObjectId",
};

export const TSFieldMap = {
  [GenericFieldTypeEnum.BOOLEAN]: "boolean",
  [GenericFieldTypeEnum.STRING]: "string",
  [GenericFieldTypeEnum.DATE]: "Date",
  [GenericFieldTypeEnum.FLOAT]: "number",
  [GenericFieldTypeEnum.INT]: "number",
  [GenericFieldTypeEnum.OBJECT]: "any",
  [GenericFieldTypeEnum.ID]: "any",
};

export const YupFieldMap = {
  [GenericFieldTypeEnum.BOOLEAN]: "boolean",
  [GenericFieldTypeEnum.STRING]: "string",
  [GenericFieldTypeEnum.ENUM]: "string",
  [GenericFieldTypeEnum.DATE]: "date",
  [GenericFieldTypeEnum.FLOAT]: "number",
  [GenericFieldTypeEnum.INT]: "number",
  [GenericFieldTypeEnum.OBJECT]: "mixed",
  [GenericFieldTypeEnum.ID]: "objectId",
};

export const YupClassFieldMap = {
  [YupFieldMap[GenericFieldTypeEnum.BOOLEAN]]: "BooleanSchema",
  [YupFieldMap[GenericFieldTypeEnum.STRING]]: "StringSchema",
  [YupFieldMap[GenericFieldTypeEnum.DATE]]: "DateSchema",
  [YupFieldMap[GenericFieldTypeEnum.FLOAT]]: "NumberSchema",
  [YupFieldMap[GenericFieldTypeEnum.INT]]: "NumberSchema",
  [YupFieldMap[GenericFieldTypeEnum.OBJECT]]: "ObjectSchema",
  [YupFieldMap[GenericFieldTypeEnum.ID]]: "ObjectIdSchema",
};

function startsWithVowel(x) {
  return /[aeiouAEIOU]/.test(x[0]);
}
