import React, { createElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import copy from "recursive-copy";

import template from "./template";

const App = require("./pages/App");

const html = template({
  title: "react-book",
  body: renderToStaticMarkup(createElement(App, { data: [] }))
});

fs.writeFileSync("./out/index.html", html, { encoding: "utf8" });

copy("static", "out/static").then(result => {
  console.log(result);
});
