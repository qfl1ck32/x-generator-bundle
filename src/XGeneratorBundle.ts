import {
  TerminalBundle,
  CommanderService,
  chalk,
} from "@kaviar/terminal-bundle";
import { Bundle } from "@kaviar/core";
import commands from "./commands";
import { execSync } from "child_process";
import { GENERATOR_QUOTES } from "./constants";

export class XGeneratorBundle extends Bundle {
  dependencies = [TerminalBundle];

  async init() {
    const service = this.get<CommanderService>(CommanderService);

    commands.forEach((command) => {
      service.registerCommand(command);
    });

    this.displayWelcomeMessage();
  }

  public displayWelcomeMessage() {
    console.log(chalk.yellowBright(`${X_WAY}`));

    const logoLength = X_WAY.split("\n")[1].length;
    const message =
      GENERATOR_QUOTES[Math.floor(Math.random() * GENERATOR_QUOTES.length)];

    console.log(
      " ".repeat(logoLength / 2 - message.length / 2) +
        chalk.green.bold(message)
    );
    console.log("");
  }
}

const X_WAY = String.raw`
___   ___      ____    __    ____  ___   ____    ____ 
\  \ /  /      \   \  /  \  /   / /   \  \   \  /   / 
 \  V  /   _____\   \/    \/   / /  ^  \  \   \/   /  
  >   <   |______\            / /  /_\  \  \_    _/   
 /  .  \          \    /\    / /  _____  \   |  |     
/__/ \__\          \__/  \__/ /__/     \__\  |__|

                  by KaviarJS     
`;
