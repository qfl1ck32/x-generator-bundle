export interface IProjectConstructorOptions {
  name: string;
  microservices?: Microservice[];
}

export class Project {
  name: string;
  api: BackendMicroservice;
  frontends: FrontendMicroservice;
  // frontend: IFrontend

  constructor(options: IProjectConstructorOptions) {
    Object.assign(this, options);
  }

  async process() {
    // Prepare and link collections properly (if they are by name)
  }
}

export class Microservice {
  name: string;
}

export interface IBackendConstructorOptions {
  name: string;
  collections?: Collection[];
  graphql?: {
    entities: Model[];
  };
}

export class BackendMicroservice
  extends Microservice
  implements IBackendConstructorOptions {
  constructor(options: Partial<IBackendConstructorOptions>) {
    super();
    Object.assign(this, options);
  }
}

export interface FrontendConstructorOptions {
  name: string;
  backend: string;
  cruds?: FrontendCRUD[];
}

export class FrontendMicroservice extends Microservice {
  constructor() {
    super();
  }
}

type ICollection = {
  name: string;
  behaviors?: string[];
  relations?: CollectionRelation[];
  fields: Field[];
  graphql?: boolean;
};

export class Collection implements ICollection {
  name: string;
  behaviors: string[] = [];
  fields: Field[] = [];
  relations: CollectionRelation[] = [];
  graphqlEntity: boolean = true;

  constructor(options: ICollection) {
    Object.assign(this, options);
  }
}

export interface ICollectionRelationDirect {
  name: string;
  field: string;
  many: boolean;
}

export interface ICollectionRelationInversed {
  name: string;
  inversedBy: string;
}

export class CollectionRelation {}

export interface IModel {
  name: string;
  fields: IField[];
}

export type FieldTypes =
  | "string"
  | "boolean"
  | "integer"
  | "float"
  | "date"
  | "enum"
  | "id"
  | "model";

export interface IField {
  label: string;
  type: FieldTypes; // primitives incl. model
  enumValues?: { label: string; value: string }[];
  variableName?: string;
  description?: string;
  many?: boolean;
  required?: boolean;
  subfields?: IField[];
}

export class Model implements IModel {
  name: string;
  fields: IField[];

  constructor(options: IModel) {
    Object.assign(this, options);
  }
}

export class Field implements IField {
  label: string;
  variableName: string;
  many: boolean;
  required: boolean;
  type: FieldTypes;
  model?: IModel;
  nested: boolean;
  context?: string;
  description?: string;
  subfields?: IField[];

  constructor(options: Partial<IField>) {
    Object.assign(this, options);
  }
}

export interface IFrontendCRUD {
  collectionName: string;
}

export class FrontendCRUD implements IFrontendCRUD {
  collectionName: string;

  constructor(options: Partial<IFrontendCRUD>) {
    Object.assign(this, options);
  }
}
