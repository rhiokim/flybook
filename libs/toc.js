import fs from "fs";
import { join, dirname, basename } from "path";
import glob from "glob";
import del from "del";
import titleize from "titleize";
import yaml from "json2yaml";
import unslug from "./unslug";

const gen = docDir => {
  let toc = {};
  const files = glob.sync(join(docDir, "**/*.md"), {
    ignore: [join(docDir, "node_modules/**")]
  });

  files.forEach(file => {
    file = file.replace(docDir + "/", "");
    const dir = unslug(dirname(file));
    const name = unslug(basename(file).replace(/\.md$/, ""));

    if (dir === ".") {
      return;
    }

    if (toc.hasOwnProperty(dir)) {
      toc[dir] = Object.assign(toc[dir], {
        [titleize(name)]: file
      });
    } else {
      toc = Object.assign(toc, {
        [titleize(dir)]: {
          [titleize(name)]: file
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
  const out = join(docDir, "toc.yml");

  save(out, json);
};

export const overwriteTOC = docDir => {
  const json = gen(docDir);
  const out = join(docDir, "toc.yml");

  del.sync([out]);
  save(out, json);
};
