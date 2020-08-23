#!/usr/bin/env node

// CLITS
import { Kernel } from "@kaviar/core";
import { TerminalBundle } from "@kaviar/terminal-bundle";
import { XGeneratorBundle } from "./XGeneratorBundle";

const kernel = new Kernel({
  bundles: [
    new TerminalBundle({
      version: require("../package.json").version,
    }),
    new XGeneratorBundle(),
  ],
});

kernel.init();
