import { Kernel } from "@kaviar/core";
import { TerminalBundle } from "@kaviar/terminal-bundle";
import { XGeneratorBundle } from "..";
import { Project } from "./index";

export function generateProject(project: Project) {
  const kernel = new Kernel({
    bundles: [
      new TerminalBundle({
        version: require("../package.json").version,
      }),
      new XGeneratorBundle(),
    ],
  });

  kernel.init().then(() => {
    // kernel.container.get()
    // Do the writing
  });
}
