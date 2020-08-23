import { GenericModel } from "./GenericModel";
import { IXElementResult, XElements, XElementType } from "../utils/XElements";
import { ModelRaceEnum } from "./defs";
import * as path from "path";

export class CollectionLinkModel {
  collectionAElement: IXElementResult;
  collectionBElement: IXElementResult;

  whereIsTheLinkStored: "A" | "B";
  type: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany";

  linkFromA: string;
  linkFromB: string;
  fieldName: string;

  get isMany() {
    return ["oneToMany", "manyToMany"].includes(this.type);
  }

  get linkStoredInA() {
    return this.whereIsTheLinkStored === "A";
  }

  get linkStoredInB() {
    return this.whereIsTheLinkStored === "B";
  }

  get isUnique() {
    return ["oneToOne"].includes(this.type);
  }

  get importCollectionALine() {
    // import { A } from "../A.collection.js"
    return this.createImportLine(
      this.collectionAElement,
      this.collectionBElement.importablePath
    );
  }

  get importCollectionBLine() {
    return this.createImportLine(
      this.collectionBElement,
      this.collectionAElement.importablePath
    );
  }

  createImportLine(where: IXElementResult, fromPath) {
    const relativePath = XElements.importPath(
      path.dirname(fromPath),
      where.importablePath
    );

    return `import { ${where.identityName} } from "${relativePath}";`;
  }
}
