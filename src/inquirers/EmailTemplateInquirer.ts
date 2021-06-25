import { Inquirer, Shortcuts } from "@kaviar/terminal-bundle";
import { EmailTemplateModel } from "../models/EmailTemplateModel";
import { InquiryUtils } from "../utils";

export class EmailTemplateInquirer extends Inquirer<EmailTemplateModel> {
  async inquire() {
    await InquiryUtils.inquireAllBundles(this);

    await this.prompt(
      "emailName",
      Shortcuts.input("Enter the name of the email (ex: Welcome)")
    );
  }
}
