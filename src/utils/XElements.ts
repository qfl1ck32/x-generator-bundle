import { FSUtils } from "./FSUtils";
import * as fs from "fs";
import * as path from "path";
import * as fg from "fast-glob";

/**
 * Thi s
 */
export class XElements {
  static findElements(
    type: XElementType,
    microservicePath: string
  ): IXElementResult[] {
    const bundles = FSUtils.listBundles(microservicePath);
    const elements: IXElementResult[] = [];

    bundles.forEach((bundle) => {
      const bundlePath = path.join(microservicePath, "src", "bundles", bundle);
      const files = fg.sync(XElementGlob[type], {
        onlyFiles: true,
        cwd: bundlePath,
      });

      files.forEach((file) => {
        const identityNameRaw = path
          .basename(file)
          .split(".")
          .slice(0, -1 * XElementFilePortionCut[type])
          .join(".");
        elements.push({
          type,
          bundleName: bundle,
          elementPath: file,
          absolutePath: path.join(bundlePath, file),
          // We don't need to worry about .graphql files because we only import .ts files here
          importablePath: path.join(
            bundlePath,
            file.split(".").slice(0, -1).join(".")
          ),
          identityNameRaw: identityNameRaw,
          identityName:
            // The idea here is that the file ends with either something like .service.ts,
            // either ends with .graphql, so we sometimes need to cut the last 2 parts (splitted by .),
            // sometimes last part. This is what this code does
            identityNameRaw + XElementClassSuffix[type],
        });
      });
    });

    return elements;
  }

  static importPath(fromFilePath, toImportablePath) {
    return path.relative(fromFilePath, toImportablePath);
  }
}

export interface IXElementResult {
  type: XElementType;
  /**
   * The name of the bundle: CoreBundle
   */
  bundleName: string;
  /**
   * Path relative to the bundle, example: services/X.service.ts
   */
  elementPath: string;
  /**
   * Path that can be imported (absolute)
   */
  importablePath: string;
  /**
   * Identity name but without the suffix
   */
  identityNameRaw: string;
  /**
   * example: UserManagerService, UserCollection, UserEntity
   */
  identityName: string;
  /**
   * The absolute path that can be read from anywhere
   */
  absolutePath: string;
}

export enum XElementType {
  SERVICE = "service",
  EVENT = "event",
  EXCEPTION = "exception",
  LISTENER = "listener",
  COLLECTION = "collection",
  COLLECTION_MODEL = "collection-model",
  GRAPHQL_ENTITY = "graphql-entity",
  GRAPHQL_INPUT = "graphql-input",
  GRAPHQL_INPUT_MODEL = "graphql-input-model",
}

export const XElementGlob = {
  [XElementType.SERVICE]: "services/**/*.service.ts",
  [XElementType.EVENT]: "events/**/*.event.ts",
  [XElementType.EXCEPTION]: "exceptions/**/*.exception.ts",
  [XElementType.LISTENER]: "listeners/**/*.listener.ts",
  [XElementType.COLLECTION]: "collections/**/*.collection.ts",
  [XElementType.COLLECTION_MODEL]: "collections/**/*.model.ts",
  [XElementType.GRAPHQL_INPUT_MODEL]: "inputs/**/*.ts",
  [XElementType.GRAPHQL_INPUT]: "graphql/inputs/**/*.graphql",
  [XElementType.GRAPHQL_ENTITY]: "graphql/entities/**/*.graphql",
};

export const XElementFilePortionCut = {
  [XElementType.SERVICE]: 2,
  [XElementType.EVENT]: 2,
  [XElementType.EXCEPTION]: 2,
  [XElementType.LISTENER]: 2,
  [XElementType.COLLECTION]: 2,
  [XElementType.COLLECTION_MODEL]: 2,
  [XElementType.GRAPHQL_INPUT_MODEL]: 1,
  [XElementType.GRAPHQL_INPUT]: 1,
  [XElementType.GRAPHQL_ENTITY]: 1,
};

export const XElementClassSuffix = {
  [XElementType.SERVICE]: "Service",
  [XElementType.EVENT]: "Event",
  [XElementType.EXCEPTION]: "Exception",
  [XElementType.LISTENER]: "Listener",
  [XElementType.COLLECTION]: "Collection",
  [XElementType.COLLECTION_MODEL]: "",
  [XElementType.GRAPHQL_INPUT_MODEL]: "",
  [XElementType.GRAPHQL_INPUT]: "",
  [XElementType.GRAPHQL_ENTITY]: "",
};
