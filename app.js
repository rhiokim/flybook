import React, { createElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import Router from "react-router";

import template from "./template";

const App = require("./pages/App");

const html = template({
  title: "react-book",
  body: renderToStaticMarkup(createElement(App, { data: [] }))
});
