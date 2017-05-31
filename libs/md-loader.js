import fs from "fs";
import remark from "remark";
import html from "remark-html";
import hljs from "remark-highlight.js";
// import recommended from "remark-presset-lint-recommended";

module.exports = file => {
  let markdown = fs.readFileSync(file).toString("utf8");
  let vfile = remark().use([html, hljs]).processSync(markdown);

  return vfile.contents;
};
