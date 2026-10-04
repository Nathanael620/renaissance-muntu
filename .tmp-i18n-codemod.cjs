const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const sourceRoot = path.resolve("src");
const helperPath = path.resolve("src/i18n/translateContent");
const attributeNames = new Set(["alt", "aria-label", "aria-description", "title", "placeholder"]);
const files = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(filename);
    else if (filename.endsWith(".tsx") && !filename.includes(`${path.sep}i18n${path.sep}`)) files.push(filename);
  }
}

function normalizedText(raw) {
  return raw.replace(/[\t\r\n ]+/g, " ").trim();
}

collect(sourceRoot);
let changedFiles = 0;
let changedNodes = 0;

for (const filename of files) {
  const original = fs.readFileSync(filename, "utf8");
  const source = ts.createSourceFile(filename, original, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];

  function visit(node) {
    if (ts.isJsxText(node)) {
      const key = normalizedText(node.text);
      if (key) {
        const leading = /^\s/.test(node.text) && !/^[\r\n]/.test(node.text) ? " " : "";
        const trailing = /\s$/.test(node.text) && !/[\r\n]$/.test(node.text) ? " " : "";
        const value = `${leading}${key}${trailing}`;
        edits.push({ start: node.getStart(source), end: node.end, text: `{translateContent(${JSON.stringify(value)})}` });
        changedNodes += 1;
      }
    } else if (
      ts.isJsxExpression(node) &&
      node.expression &&
      (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent)) &&
      !ts.isCallExpression(node.expression)
    ) {
      const expression = node.expression.getText(source);
      edits.push({ start: node.getStart(source), end: node.end, text: `{translateContent(${expression})}` });
      changedNodes += 1;
    } else if (ts.isJsxAttribute(node) && attributeNames.has(node.name.getText(source)) && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) {
        const value = node.initializer.text;
        edits.push({ start: node.initializer.getStart(source), end: node.initializer.end, text: `{translateContent(${JSON.stringify(value)})}` });
        changedNodes += 1;
      } else if (ts.isJsxExpression(node.initializer) && node.initializer.expression && !ts.isCallExpression(node.initializer.expression)) {
        const expression = node.initializer.expression.getText(source);
        edits.push({ start: node.initializer.getStart(source), end: node.initializer.end, text: `{translateContent(${expression})}` });
        changedNodes += 1;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  if (!edits.length) continue;
  edits.sort((left, right) => right.start - left.start);
  let output = original;
  for (const edit of edits) output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
  let importPath = path.relative(path.dirname(filename), helperPath).split(path.sep).join("/");
  if (!importPath.startsWith(".")) importPath = `./${importPath}`;
  if (!original.includes("translateContent")) output = `import { translateContent } from ${JSON.stringify(importPath)};\n${output}`;
  fs.writeFileSync(filename, output);
  changedFiles += 1;
}

console.log(JSON.stringify({ scanned: files.length, changedFiles, transformedNodes: changedNodes }));
