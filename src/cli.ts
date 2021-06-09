#!/usr/bin/env node

// CLITS
import { Kernel } from "@kaviar/core";
import { TerminalBundle } from "@kaviar/terminal-bundle";
import { execSync } from "child_process";
import { XGeneratorBundle } from "./XGeneratorBundle";

const kernel = new Kernel({
  bundles: [
    new TerminalBundle({
      version: require("../package.json").version,
    }),
    new XGeneratorBundle(),
  ],
});

kernel.init().then(() => {
  // exec('npm view @kaviar/x version').
});
