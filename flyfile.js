const notifier = require("node-notifier");

export async function compile(fly) {
  await fly.parallel(["main", "bin", "libs", "components"]);
}

export async function bin(fly, opts) {
  await fly
    .source(opts.src || "bin/*")
    .babel()
    .target("dist/bin", { mode: "0755" });
  notify("Compiled binaries");
}

export async function main(fly, opts) {
  await fly.source("app.js").babel().target("dist");
  notify("Compiled main script");
}

export async function components(fly, opts) {
  await fly
    .source(opts.src || "components/*")
    .babel({ babelrc: true })
    .target("dist/components");
  notify("Compiled components");
}

export async function libs(fly, opts) {
  await fly.source(opts.src || "libs/**/*.js").babel().target("dist/libs");
  notify("Compiled lib files");
}

export async function copy(fly) {
  await fly
    .source("pages/**/*.js")
    .babel({ babelrc: true })
    .target("dist/pages");
  await fly.source("package.json").target("dist");
  notify("Compiled page files and Copied package.json");
}

export async function build(fly) {
  await fly.serial(["copy", "compile"]);
}

export default async function(fly) {
  await fly.start("build");
  await fly.watch("bin/*", "bin");
  await fly.watch("components/*", "components");
  await fly.watch("libs/**/*.js", ["libs"]);
  await fly.watch("pages/**/*.js", "copy");
}

// notification helper
function notify(msg) {
  return notifier.notify({
    title: "Next-Book",
    message: msg,
    icon: false
  });
}
