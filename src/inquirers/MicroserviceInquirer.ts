import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { MicroserviceModel, MicroserviceTypeEnum } from "../models";
import { FSUtils } from "../utils/FSUtils";
import * as path from "path";

export class MicroserviceInquirer extends Inquirer<MicroserviceModel> {
  model = new MicroserviceModel();

  async inquire() {
    const nearest = FSUtils.getNearest("project");

    await this.prompt(
      "name",
      Shortcuts.input("Enter the name of the microservice")
    );

    await this.prompt(
      "type",
      Shortcuts.autocomplete(
        "Enter the type",
        Object.values(MicroserviceTypeEnum)
      )
    );
  }
}
