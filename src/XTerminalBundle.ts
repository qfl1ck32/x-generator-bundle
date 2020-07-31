import { TerminalBundle, CommanderService } from "@kaviar/terminal-bundle";
import { Bundle } from "@kaviar/core";
import commands from "./commands";

export class XTerminalBundle extends Bundle {
  dependencies = [TerminalBundle];

  async init() {
    const service = this.get<CommanderService>(CommanderService);

    commands.forEach((command) => {
      service.registerCommand(command);
    });
  }
}
