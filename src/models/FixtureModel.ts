import { GenericModel } from "./GenericModel";
import { IXElementResult, XElements, XElementType } from "../utils/XElements";
import { ModelRaceEnum } from "./defs";
import * as path from "path";
import * as _ from "lodash";

export class FixtureModel {
  bundleName: string;
  collectionElement: IXElementResult;
  fixtureName: string;

  // Representing the path of the fixture
  targetPath: string;

  get fixtureClass() {
    return _.upperFirst(this.fixtureName) + "Fixture";
  }

  get collectionClass() {
    return this.collectionElement.identityName;
  }

  get collectionVariable() {
    return _.lowerFirst(this.collectionClass);
  }

  get importCollectionLine() {
    // import { A } from "../A.collection.js"
    return this.createImportLine(this.collectionElement, this.targetPath);
  }

  createImportLine(where: IXElementResult, fromPath) {
    const relativePath = XElements.importPath(
      path.dirname(fromPath),
      where.importablePath
    );

    return `import { ${where.identityName} } from "${relativePath}";`;
  }
}
