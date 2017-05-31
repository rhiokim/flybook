import fs from "fs";
import { join, dirname } from "path";
import copy from "recursive-copy";
import del from "del";
import mkdirp from "mkdirp";
import React, { createElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

import routeTable from "./libs/routes";
import mdLoader from "./libs/md-loader";
import template from "./template";
import App from "./pages/App";
import pkg from "./package.json";

const BASE_DIR = join(process.cwd(), "docs");
const OUTPUT_DIR = join(process.cwd(), "out");

const routes = routeTable(BASE_DIR);

const Html = (title, contents, routes) => {
  return template({
    title: pkg.name,
    body: renderToStaticMarkup(
      createElement(App, { title: title, contents: contents, toc: routes })
    )
  });
};

const makeIndexPage = () => {
  let contents = mdLoader(join(BASE_DIR, "index.md"));
  let html = Html(pkg.name, contents, routes);

  /* gen new files */
  fs.writeFileSync(join(OUTPUT_DIR, "index.html"), html, { encoding: "utf8" });
};

mkdirp.sync(OUTPUT_DIR);

/* clean previous files */
del.sync(["out/**/*"]);

makeIndexPage();

Object.keys(routes).map(key => {
  const subRoutes = routes[key];

  Object.entries(subRoutes).map((item, i) => {
    let outputDir = join(OUTPUT_DIR, item[1].replace(/\.md$/, ""));
    let outputFile = join(outputDir, "index.html");

    let contents = mdLoader(join(BASE_DIR, item[1]));
    let html = Html(item[0], contents, routes);

    /* mkdir route dir */
    mkdirp.sync(join(outputDir));

    /* gen new files */
    fs.writeFileSync(outputFile, html, { encoding: "utf8" });
  });
});

copy("static", "out/static").then(result => {
  console.log("created");
});
