import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import { NearestElementNotFoundException } from "../exceptions/NearestElementNotFound.exception";

const TEMPLATES_DIR = __dirname + "/../../templates";

export class FSUtils {
  static getNearest(
    type: "microservice" | "project",
    starting = process.cwd()
  ) {
    if (starting === "/") {
      throw new NearestElementNotFoundException({ type });
    }
    const filePath = path.join(starting, "package.json");

    if (fs.existsSync(filePath)) {
      const packageJson = fse.readJSONSync(filePath);
      if (packageJson.kaviar && packageJson.kaviar.type === type) {
        return path.dirname(filePath);
      }
    }

    return this.getNearest(type, path.join(starting, ".."));
  }

  static getProjectName(projectPath?: string) {
    projectPath = projectPath ?? this.getNearest("project");
    const packageJson = fse.readJSONSync(
      path.join(projectPath, "package.json")
    );

    return packageJson.name;
  }

  static listBundles(microservicePath) {
    const basePath = path.join(microservicePath, "src", "bundles");
    const allFiles = fs.readdirSync(basePath);

    return allFiles.filter((file) =>
      fs.lstatSync(path.join(basePath, file)).isDirectory()
    );
  }

  static bundlePath(
    microserviceDir: string,
    bundleName: string,
    suffixPath: string = ""
  ) {
    return path.join(microserviceDir, "src", "bundles", bundleName, suffixPath);
  }

  static getTemplatePath(templatePath: string) {
    templatePath = path.join(...templatePath.split("/"));
    return path.join(TEMPLATES_DIR, templatePath);
  }

  static getTemplatePathCreator(prefix: string) {
    return (templatePath: string = "") => {
      templatePath = path.join(...templatePath.split("/"));
      return this.getTemplatePath(path.join(prefix, templatePath));
    };
  }
}
