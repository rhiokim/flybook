#!/usr/bin/env node
import { resolve, join } from "path";
import { existsSync } from "fs";
import parseArgs from "minimist";
import exportApp from "../app";

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: "help",
    s: "silent",
    o: "outdir"
  },
  boolean: ["h"],
  default: {
    s: false,
    o: null
  }
});

if (argv.help) {
  console.log(
    `
    Description
      Exports the static website for production deployment
    Usage
      $ next-book <outdir> [options]
    <outdir> represents where the compiled dist folder should go.
    If no directory is provided, the 'out' folder will be created in the current directory.
    You can set a custom folder in config https://rhiokim.github.io/next-note
    Options
      -h - list this help
      -o - set the output dir (defaults to 'out')
      -s - do not print any messages to console
  `
  );
  process.exit(0);
}

const dir = resolve(argv._[0] || ".");

// Check if pages dir exists and warn if not
if (!existsSync(dir)) {
  console.log(`> No such directory exists as the documentation root: ${dir}`);
  process.exit(1);
}

if (!existsSync(join(dir, "toc.yml"))) {
  if (existsSync(join(dir, "..", "toc.yml"))) {
    console.log(
      "> No `toc.yml` file found. Did you mean to run `next-book` in the parent (`../`) directory?"
    );
    process.exit(1);
  }

  console.log(
    "> Couldn't find a `toc.yml` file. Please create one under the documentation root"
  );
  process.exit(1);
}

const options = {
  docDir: dir,
  silent: argv.silent,
  outDir: argv.outdir ? resolve(argv.outdir) : resolve(dir, "../out")
};

exportApp(options);
