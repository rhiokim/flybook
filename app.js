import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import copy from "recursive-copy";
import del from "del";
import mkdirp from "mkdirp";
import React, { createElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

import routeTable from "./libs/routes";
import mdLoader from "./libs/md-loader";
import _document from "./libs/_document";
import App from "./pages/App";

const pkg = require(`${process.cwd()}/package.json`);

const Html = (title, contents, routes) => {
  return _document({
    title: title,
    body: renderToStaticMarkup(
      createElement(App, { title, contents, toc: routes, pkg })
    )
  });
};

const makeIndexPage = (docDir, outDir, routes) => {
  let contents;
  let html = Html(pkg.name, contents, routes);

  try {
    contents = mdLoader(join(docDir, "readme.md"));
  } catch (e) {
    console.log(`> No 'readme.md' file found in ${docDir}`);
    process.exit(1);
  }

  /* gen new files */
  writeFileSync(join(outDir, "index.html"), html, { encoding: "utf8" });
};

module.exports = ({ docDir, outDir, slient }) => {
  const routes = routeTable(docDir);

  /* clean previous files */
  del.sync([`${outDir}/**/*`]);

  // create output directory
  mkdirp.sync(outDir);

  //
  makeIndexPage(docDir, outDir, routes);

  Object.keys(routes).map(key => {
    const subRoutes = routes[key];

    Object.entries(subRoutes).map((item, i) => {
      let outputDir = join(outDir, item[1].replace(/\.md$/, ""));
      let outputFile = join(outputDir, "index.html");

      let contents = mdLoader(join(docDir, item[1]));
      let html = Html(item[0], contents, routes);

      /* mkdir route dir */
      mkdirp.sync(outputDir);

      /* gen new files */
      writeFileSync(outputFile, html, { encoding: "utf8" });
    });
  });

  copy(join(__dirname, "../static"), `${outDir}/static`).then(result => {
    console.log(`> FlyBook was generated at ${outDir}`);
  });
};
