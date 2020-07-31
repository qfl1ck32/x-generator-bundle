#!/usr/bin/env node

// CLITS
import { Kernel } from "@kaviar/core";
import { TerminalBundle } from "@kaviar/terminal-bundle";
import { XTerminalBundle } from "./XTerminalBundle";

const kernel = new Kernel({
  bundles: [
    new TerminalBundle({
      version: require("../package.json").version,
    }),
    new XTerminalBundle(),
  ],
});

kernel.init();
