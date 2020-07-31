import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { CreateBundleModel } from "../models";
import { FSUtils } from "../utils/FSUtils";

export class CreateBundleInquirer extends Inquirer<CreateBundleModel> {
  model = new CreateBundleModel();

  async inquire() {
    const nearest = FSUtils.getNearest("microservice");

    await this.prompt(
      "bundleName",
      Shortcuts.input("Enter the name of your bundle")
    );

    await this.prompt(
      "containsGraphQL",
      Shortcuts.confirm("Add GraphQL folder?")
    );
  }
}
