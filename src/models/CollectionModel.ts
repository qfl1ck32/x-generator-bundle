import * as _ from "lodash";
import { GenericModel } from "./GenericModel";

export class CollectionModel {
  bundleName: string;
  collectionName: string;

  isTimestampable: boolean;
  isSoftdeletable: boolean;
  isBlameable: boolean;

  modelDefinition: GenericModel;
  validateAgainstModel: boolean;

  createEntity: string;
  isEntitySameAsModel: boolean;
  entityDefinition: GenericModel;

  constructor() {}

  // links: ILink;
  get collectionModelClass() {
    return this.modelDefinition.name;
  }

  get containsBehaviors() {
    return (
      this.isTimestampable ||
      this.isSoftdeletable ||
      this.isBlameable ||
      this.validateAgainstModel
    );
  }

  get collectionNameUpper() {
    return _.upperFirst(this.collectionName);
  }

  get collectionClass() {
    const propperForm = _.upperFirst(this.collectionName);

    return propperForm + "Collection";
  }
}

export enum BehaviorsEnum {
  TIMESTAMPABLE = "Timestampable",
  SOFTDELETABLE = "Softdeletable",
  VALIDATABLE = "Validatable",
  BLAMEABLE = "Blameable",
}
