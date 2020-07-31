import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { CreateBundleModel } from "../models";
import { FSUtils } from "../utils/FSUtils";
import { GenericModel } from "../models/GenericModel";
import { IGenericField, GenericFieldTypeEnum } from "../models/defs";

export class GenericFieldInquirer extends Inquirer<IGenericField> {
  model = {
    name: "",
    type: GenericFieldTypeEnum.STRING,
    isOptional: true,
    isMany: false,
  };

  async inquire() {
    await this.prompt("name", Shortcuts.input("What is field's name?"));

    await this.prompt(
      "isMany",
      Shortcuts.confirm("Is this field an array?", false)
    );
    await this.prompt(
      "type",
      Shortcuts.autocomplete(
        "What is field's type?",
        Object.values(GenericFieldTypeEnum)
      )
    );
    await this.prompt("isOptional", Shortcuts.confirm("Is optional?", false));

    if (this.model.type === GenericFieldTypeEnum.MODEL) {
      // TODO: somehow feed additional models to the generic field inquirer?
    }

    if (this.model.type === GenericFieldTypeEnum.ENUM) {
      await this.prompt(
        "enumCSVValues",
        Shortcuts.input("Enter the values of your enum, comma separated")
      );
      // TODO: allow him to configure ENUM states
    }
  }
}
