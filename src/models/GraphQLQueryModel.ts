import { GenericModel } from "./GenericModel";
import { IXElementResult, XElements, XElementType } from "../utils/XElements";
import { ModelRaceEnum } from "./defs";
import * as path from "path";

export class GraphQLQueryModel {
  bundleName: string;
  queryName: string;
  returnType: string;
  returnTypeIsArray: boolean;
  delegateType: QueryDelegateType;

  // Security checks
  checkLoggedIn: boolean;
  permissionCheck: boolean;

  collectionElement: IXElementResult; //relative to microservice

  // In case of service
  serviceElement: IXElementResult; // relative to microservice
  serviceMethodName: string;

  // Model checks
  hasInput: boolean;
  inputAlreadyExists: boolean;
  inputElement?: IXElementResult; // relative to microservice
  inputModel?: GenericModel = new GenericModel("", ModelRaceEnum.GRAPHQL_INPUT);

  // In the writing process store this so we can do proper imports
  resolverTargetPath: string;

  get returnTypeFormatted() {
    if (this.returnType === "void") {
      return "Boolean";
    }

    if (this.returnTypeIsArray) {
      return `[${this.returnType}]!`;
    }

    return this.returnType + "!";
  }

  get collectionClass() {
    return this.collectionElement.identityName;
  }

  get inputClass() {
    if (this.inputAlreadyExists) {
      return this.inputElement.identityName;
    } else {
      return this.inputModel.modelClass;
    }
  }

  get endOperation() {
    switch (this.delegateType) {
      case QueryDelegateType.CUSTOM:
        return `(_, args, ctx, info) => { /* code goes here */ },`;
      case QueryDelegateType.SERVICE:
        return `ToService(${this.serviceElement.identityName}, "${this.serviceMethodName}"),`;
      case QueryDelegateType.NOVA:
        if (this.returnTypeIsArray) {
          return `ToNova()`;
        } else {
          return `ToNovaOne()`;
        }
    }
  }

  get inputFormatted() {
    if (this.isNova()) {
      return `(input: QueryInput!)`;
    }

    if (!this.hasInput) {
      return "";
    }

    return `(input: ${this.inputClass}!)`;
  }

  get inputImportLine() {
    if (this.isNova()) {
      return;
    }

    return this.createImportLine(this.inputElement);
  }

  get collectionImportLine() {
    return this.createImportLine(this.collectionElement);
  }

  get serviceImportLine() {
    return this.createImportLine(this.serviceElement);
  }

  createImportLine(element: IXElementResult) {
    if (!element) {
      return;
    }

    const relativePath = XElements.importPath(
      path.dirname(this.resolverTargetPath),
      element.importablePath
    );

    return `import { ${element.identityName} } from "${relativePath}"`;
  }

  isNova() {
    return this.delegateType === QueryDelegateType.NOVA;
  }
}

export enum QueryDelegateType {
  SERVICE = "service",
  NOVA = "nova",
  CUSTOM = "custom",
}
