import fs from "fs";
import remark from "remark";
import html from "remark-html";
// import recommended from "remark-presset-lint-recommended";

module.exports = file => {
  let markdown = fs.readFileSync(file).toString("utf8");
  let vfile = remark().use(html).processSync(markdown);

  return vfile.contents;
};
