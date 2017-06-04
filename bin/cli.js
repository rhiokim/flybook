#!/usr/bin/env node
import { resolve, join } from "path";
import { existsSync } from "fs";
import inquirer from "inquirer";
import parseArgs from "minimist";
import updateNotifier from "update-notifier";
import exportApp from "../app";
import { writeTOC, overwriteTOC } from "../libs/toc";
const pkg = require("../../package.json");

var questions = [
  {
    type: "input",
    name: "toc",
    message: "There is no `toc.yml` which is table of contents file to generate static book\nPlease create table of content [Y/n]"
  }
];

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: "help",
    s: "silent",
    o: "outdir",
    t: "toc",
    v: "version"
  },
  boolean: ["h"],
  default: {
    s: false,
    o: null
  }
});

if (argv.version) {
  console.log(`Flybook v${pkg.version}`);
  process.exit(0);
}

if (argv.help || !argv._[0]) {
  console.log(
    `
    Description
      FlyBook is a simple utility to generate static website that look like online manual.

    Usage
      $ flybook <outdir> [options]
      <outdir> represents where the compiled dist folder should go.

    If no directory is provided, the 'out' folder will be created in the current directory.
    You can set a custom folder in config https://rhiokim.github.io/flybook

    Options
      -h - list this help
      -v - version of FlyBook
      -o - set the output dir (defaults to 'out')
      -s - do not print any messages to console
      -t - generate new toc.yml file
  `
  );
  process.exit(0);
}

const dir = resolve(argv._[0] || ".");

const gen = () => {
  const options = {
    docDir: dir,
    silent: argv.silent,
    outDir: argv.outdir ? resolve(argv.outdir) : resolve(dir, "../out_flybook")
  };

  exportApp(options);
};

// Check if pages dir exists and warn if not
if (!existsSync(dir)) {
  console.log(`> No such directory exists as the documentation root: ${dir}`);
  process.exit(1);
}

// No table of contents file found
if (!existsSync(join(dir, "toc.yml"))) {
  inquirer.prompt(questions).then(answer => {
    console.log(answer);
    if (answer.toc === "" || answer.toc === "y") {
      writeTOC(dir);
      gen();
    } else {
      console.log(
        "> No `toc.yml` file found. Did you mean to run `flybook` in the parent (`../`) directory?"
      );
      process.exit(1);
    }
  });
} else {
  // `toc.yml` file found, but wannt renew
  if (argv.toc) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "toc",
          message: "`toc.yml` file found. Overwrite? [y/N]"
        }
      ])
      .then(answer => {
        if (answer.toc === "y") {
          overwriteTOC(dir);
        }
        gen();
      });
  } else {
    gen();
  }
}

const notifier = updateNotifier({ pkg });
notifier.notify();

// console.log(notifier.update);
