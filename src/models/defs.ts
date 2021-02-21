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

export interface IFieldBaseSignature {
  type: GenericFieldTypeEnum | string;
  isOptional?: boolean;
  isMany?: boolean;
}

export interface IGenericFieldSubModel {
  /**
   * How is the name called?
   * @example UserProfile
   */
  name: string;
  fields?: IGenericField[];
  /**
   * "embed" means that it starts defining the model directly in the superclass
   * "outside" means that it's outside the model, it can be in another file, package, or locally etc.
   */
  storage: "embed" | "outside";
  /**
   * This represents whether the model is situated in the same file. Most of the times it isn't. If the model isn't local, fields can be optional.
   */
  local?: boolean;
  /**
   * If the type is model, the name represents the model name, modelReferenceBundle means a different bundle
   * The models get imported from collections
   * @example DocumentsBundle
   */
  referenceBundle?: string;
  /**
   * This is for when the import is done absolutely import { Model }
   * @example "@root/types"
   * @example "@kaviar/security-bundle"
   */
  absoluteImport?: string;
}

export interface IGenericField extends IFieldBaseSignature {
  name: string;
  /**
   * Whether to render in typescript/graphql
   */
  ignoreTypeScript?: boolean;
  ignoreGraphQL?: boolean;
  /**
   * When the type is enum we need to also specify the csv values of it
   * @example In Progress,Open,Done
   */
  enumCSVValues?: string;
  /**
   * When type is unknown or model, we generate the model.
   */
  model?: IGenericFieldSubModel;
}
