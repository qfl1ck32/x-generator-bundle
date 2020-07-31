export enum ModelRaceEnum {
  GRAPHQL_TYPE = "graphql-type",
  CLASSLIKE = "class-like",
  INTERFACE = "interface",
  GRAPHQL_INPUT = "graphql-input",
}

export enum GenericFieldTypeEnum {
  STRING = "string",
  BOOLEAN = "boolean",
  FLOAT = "float",
  INT = "integer",
  DATE = "date",
  OBJECT = "object",
  ID = "id",
  MODEL = "model",
  ENUM = "enum",
}

export interface IAvailableModel {
  selectionName: string; // Unique
  importPath: string;
}

export interface IGenericField {
  name: string;
  type: GenericFieldTypeEnum;
  isOptional?: boolean;
  isMany?: boolean;
  modelReferenceBundle?: string;
  enumCSVValues?: string;
}
