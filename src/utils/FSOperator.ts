import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import * as handlebars from "handlebars";
import * as prettier from "prettier";
import { IBlueprintWriterSession } from "@kaviar/terminal-bundle";
import {
  mergeTypeDefs,
  printTypeNode,
  printWithComments,
} from "@graphql-tools/merge";

const TPL_EXTENSION = ".tpl";
const TEMPLATES_DIR = __dirname + "/../../templates";

export class FSOperator {
  constructor(
    public readonly session: IBlueprintWriterSession,
    public readonly model: any
  ) {}

  add(paths: string | string[], fn) {
    this.session.addOperation({
      type: "custom",
      paths: Array.isArray(paths) ? paths : [paths],
      value: fn,
    });
  }

  getTemplatePath(templatePath: string) {
    return path.join(TEMPLATES_DIR, templatePath);
  }

  getTemplatePathCreator(prefix: string) {
    return (templatePath: string = "") => {
      return this.getTemplatePath(path.join(prefix, templatePath));
    };
  }

  getContents(fullPath: string) {
    return fs.readFileSync(fullPath).toString();
  }

  sessionAppendFile(filePath, content) {
    this.add([filePath], () => {
      fse.ensureFileSync(filePath);
      let fileContent = this.getContents(filePath);
      content = this.renderTemplate(content);
      if (fileContent.indexOf(content) === -1) {
        fileContent = fileContent + content;
        this.writeFileSmartly(filePath, fileContent);
      }
    });
  }

  sessionPrependFile(filePath, content) {
    this.add([filePath], () => {
      fse.ensureFileSync(filePath);
      let fileContent = fs.readFileSync(filePath).toString();
      content = this.renderTemplate(content);

      if (fileContent.indexOf(content) === -1) {
        fileContent = content + fileContent;
        this.writeFileSmartly(filePath, fileContent);
      }
    });
  }

  sessionMergeTypeDefs(sourcePath, targetPath: string) {
    this.add([targetPath], () => {
      const mother = this.getContents(targetPath);
      const extension = this.renderTemplate(this.getContents(sourcePath));
      const contents =
        mother !== ""
          ? printWithComments(mergeTypeDefs([mother, extension]))
          : extension;

      this.writeFileSmartly(targetPath, contents);
    });
  }

  sessionWrite(filePath, content) {
    this.add([filePath], () => {
      fse.ensureFileSync(filePath);
      this.writeFileSmartly(filePath, content);
    });
  }

  /**
   * This method creates an operation which allows us to have dynamic folder names
   * And handlebars template files
   *
   * @param src
   * @param dest
   * @param model
   */
  sessionCopy(src, dest) {
    let paths;
    const isSourceADirectory = fs.lstatSync(src).isDirectory();

    if (isSourceADirectory) {
      paths = this.extractFiles(src, { includeFolders: true }).map((p) =>
        this.transformFilePath(p.replace(src, dest))
      );
    } else {
      paths = [this.transformFilePath(dest)];
    }

    this.add(paths, () => {
      const allFilePaths = isSourceADirectory ? this.extractFiles(src) : [src];
      fse.copySync(src, dest);

      // Process Templating
      allFilePaths.forEach((filePath) => {
        filePath = filePath.replace(src, dest);

        this.writeFileSmartly(
          filePath,
          this.renderTemplate(this.getContents(filePath))
        );
      });

      // Rename Folders
      if (fs.lstatSync(dest).isDirectory()) {
        this.renameFiles(dest);
      } else {
        this.renameFile(dest);
      }
    });
  }

  /**
   * Renders the template for the current model
   */
  renderTemplate(template: string): string {
    return handlebars.compile(template, {
      noEscape: true,
    })(this.model, {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    });
  }

  /**
   * Writes the file prettier aware
   * @param filePath
   * @param content
   */
  writeFileSmartly(filePath, content) {
    content = this.renderTemplate(content);
    const prettierParserType = this.getPrettierParser(filePath);

    if (prettierParserType) {
      try {
        content = prettier.format(content, {
          trailingComma: "es5",
          tabWidth: 2,
          singleQuote: false,
          // @ts-ignore
          parser: prettierParserType,
        });
      } catch (e) {
        console.warn(
          `File ${filePath} could not be prettier formatted because it has an error`
        );
        console.warn(e);
      }
    }

    fs.writeFileSync(filePath, content);
  }

  /**
   * This ensures that the file path is transformed properly including renaming ___VARIABLE___ stuff
   * This does not do anything to the session
   * @param filePath
   * @param model
   */
  transformFilePath(filePath): string {
    if (path.extname(filePath) === TPL_EXTENSION) {
      filePath = filePath.slice(0, filePath.length - TPL_EXTENSION.length);
    }

    const extractions = filePath.match(/___([^_]+)___/g);

    if (extractions) {
      extractions.forEach((extraction) => {
        const variable = extraction.slice(3, extraction.length - 3);
        let value = this.model[variable];
        if (!value) {
          value = `VALUE_FOR_${variable}_NOT_FOUND`;
        }

        filePath = filePath.replace(extraction, value, "g");
      });
    }

    return filePath;
  }

  /**
   * Performs operations to file system
   */
  renameFiles(src) {
    const files = fs.readdirSync(src);

    files.forEach((file) => {
      const filePath = path.join(src, file);
      let stat = fs.lstatSync(filePath);
      if (stat.isFile()) {
        this.renameFile(filePath);
      } else {
        this.renameFiles(filePath);
      }
    });
  }

  renameFile(filePath) {
    const newFilePath = this.transformFilePath(filePath);
    if (filePath !== newFilePath) {
      fse.renameSync(filePath, newFilePath);
    }
  }

  /**
   * Extracts all the files and optionally folders from a path
   * @param src
   * @param options
   */
  extractFiles(src, options = { includeFolders: false }) {
    const filesArray = [];
    const files = fs.readdirSync(src);

    files.forEach((file) => {
      const filePath = path.join(src, file);
      const stat = fs.lstatSync(filePath);
      if (stat.isFile()) {
        filesArray.push(filePath);
      } else if (stat.isDirectory()) {
        if (options.includeFolders) {
          filesArray.push(filePath + "/");
        }
        filesArray.push(...this.extractFiles(filePath));
      }
    });

    return filesArray;
  }

  /**
   * Returns the correct parser for the file so it can be prettified.
   * @param filePath
   */
  getPrettierParser(filePath): string {
    const newFilePath = this.transformFilePath(filePath);
    const extName = path.extname(newFilePath);

    if (extName === ".ts") {
      return "babel-ts";
    }

    switch (extName) {
      case ".ts":
      case ".tsx":
        return "babel-ts";
      case ".gql":
      case ".graphql":
        return "graphql";
      case ".html":
        return "html";
      case ".json":
        return "json";
      case ".mdx":
      case ".md":
        return "markdown";
      case ".scss":
        return "scss";
      case ".css":
        return "css";
      case ".less":
        return "less";
    }
  }

  /**
   * Returns the nearest microservice
   * @param type
   * @param starting
   */
  getNearest(type: "microservice" | "project", starting = process.cwd()) {
    if (starting === "/") {
      throw new Error("Could not find a parent folder for type: " + type);
    }
    const filePath = path.join(starting, "package.json");

    if (fs.existsSync(filePath)) {
      const packageJson = fse.readJSONSync(filePath);
      if (packageJson.x && packageJson.x.type === type) {
        return path.dirname(filePath);
      }
    }

    return this.getNearest(type, path.join(starting, ".."));
  }
}
