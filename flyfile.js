const notifier = require("node-notifier");

export async function compile(fly) {
  await fly.parallel(["bin"]);
}

export async function bin(fly, opts) {
  await fly
    .source(opts.src || "bin/*")
    .babel()
    .target("dist/bin", { mode: "0755" });
  notify("Compiled binaries");
}

export async function build(fly) {
  await fly.serial(["compile"]);
}

export default async function(fly) {
  await fly.start("build");
}

// notification helper
function notify(msg) {
  return notifier.notify({
    title: "Next-Book",
    message: msg,
    icon: false
  });
}
