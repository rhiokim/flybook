#!/usr/bin/env node
"use strict";

var _path = require("path");

var _fs = require("fs");

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _toc = require("../libs/toc");

var _toc2 = _interopRequireDefault(_toc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2), {
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
  console.log("\n    Description\n      Exports the static website for production deployment\n    Usage\n      $ next-book <outdir> [options]\n    <outdir> represents where the compiled dist folder should go.\n    If no directory is provided, the 'out' folder will be created in the current directory.\n    You can set a custom folder in config https://rhiokim.github.io/next-note\n    Options\n      -h - list this help\n      -o - set the output dir (defaults to 'out')\n      -s - do not print any messages to console\n  ");
  process.exit(0);
}

var dir = (0, _path.resolve)(argv._[0] || ".");

// Check if pages dir exists and warn if not
if (!(0, _fs.existsSync)(dir)) {
  console.log("> No such directory exists as the documentation root: " + dir);
  process.exit(1);
}

(0, _toc2.default)(dir, argv.toc, argv["toc-overwrite"]);

if (!(0, _fs.existsSync)((0, _path.join)(dir, "toc.yml"))) {
  if ((0, _fs.existsSync)((0, _path.join)(dir, "..", "toc.yml"))) {
    console.log("> No `toc.yml` file found. Did you mean to run `next-book` in the parent (`../`) directory?");
    process.exit(1);
  }

  console.log("> Couldn't find a `toc.yml` file. Please create one under the documentation root\nUsage:\n  fly-book [DOCS_ROOT] --toc   # Generate toc.yml file into [DOCS_ROOT] directory");
  process.exit(1);
}

var options = {
  docDir: dir,
  silent: argv.silent,
  outDir: argv.outdir ? (0, _path.resolve)(argv.outdir) : (0, _path.resolve)(dir, "../out")
};

(0, _app2.default)(options);