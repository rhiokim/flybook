import fs from "fs";
import path from "path";
import glob from "glob";
import del from "del";
import titleize from "titleize";
import yaml from "json2yaml";
import unslug from "./unslug";

const gen = docDir => {
  let toc = {};
  const files = glob.sync(path.join(docDir, "**/*.md"));

  files.forEach(file => {
    file = file.replace(docDir + "/", "");
    const dirname = unslug(path.dirname(file));
    const basename = unslug(path.basename(file).replace(/\.md$/, ""));

    if (dirname === ".") {
      return;
    }

    if (toc.hasOwnProperty(dirname)) {
      toc[dirname] = Object.assign(toc[dirname], {
        [titleize(basename)]: file
      });
    } else {
      toc = Object.assign(toc, {
        [titleize(dirname)]: {
          [titleize(basename)]: file
        }
      });
    }
  });

  return toc;
};

const save = (file, json) => {
  fs.writeFileSync(file, yaml.stringify(json), {
    encoding: "utf8"
  });
};

export const writeTOC = docDir => {
  const json = gen(docDir);
  const out = path.join(docDir, "toc.yml");

  save(out, json);
};

export const overwriteTOC = docDir => {
  const json = gen(docDir);
  const out = path.join(docDir, "toc.yml");

  del.sync([out]);
  save(out, json);
};
