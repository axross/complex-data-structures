const fs = require("fs");
const path = require("path");
const terser = require("terser");
const typescript = require("typescript");
const tsconfig = require("./tsconfig.json");

const SOURCE_PATH = path.resolve(__dirname, "./src");
const README_TEMPLATE_PATH = path.resolve(__dirname, "src/README.template.md");
const README_PATH = path.resolve(__dirname, "README.md");

let readme = fs.readFileSync(README_TEMPLATE_PATH, "utf-8");

for (const entry of fs.readdirSync(SOURCE_PATH)) {
  const filename = path.resolve(SOURCE_PATH, entry);

  if (!fs.statSync(filename).isFile()) continue;
  if (!filename.endsWith(".ts")) continue;
  if (filename.endsWith(".test.ts")) continue;

  const name = /\/?([A-Za-z]+)\.ts$/.exec(filename)[1];
  const source = fs.readFileSync(filename, { encoding: "utf-8" });
  const exportRemoved = source.replace(/export (default )?/g, "");
  const { outputText: transpiled } = typescript.transpileModule(
    exportRemoved,
    tsconfig
  );
  const { code: minified } = terser.minify(transpiled);

  readme = readme.replace(`<%=${name}>`, minified);

  console.log("injected:", name);
}

fs.writeFileSync(README_PATH, readme, "utf-8");
