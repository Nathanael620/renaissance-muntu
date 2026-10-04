const fs = require("fs");
const path = require("path");

function loadTsRecord(file) {
  const text = fs.readFileSync(file, "utf8");
  const m = text.match(/const \w+: Record<string, string> = (\{[\s\S]*?\});\s*export default/);
  if (!m) return {};
  return Function("return " + m[1])();
}

const root = path.join(__dirname, "src/i18n/locales/en");
const en = {
  ...loadTsRecord(path.join(root, "common.ts")),
  ...loadTsRecord(path.join(root, "navigation.ts")),
  ...loadTsRecord(path.join(root, "content.ts")),
  ...loadTsRecord(path.join(root, "data.ts")),
  ...loadTsRecord(path.join(root, "manifestos.ts")),
  ...loadTsRecord(path.join(root, "extra.ts")),
};
const keys = new Set(Object.keys(en));

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== "i18n") walk(p, out);
    else if (/\.(tsx|ts)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const strRe = /translateContent\(\s*([`'"])([\s\S]*?)\1/g;
const missing = new Map();

for (const file of walk(path.join(__dirname, "src"))) {
  const text = fs.readFileSync(file, "utf8");
  let m;
  while ((m = strRe.exec(text))) {
    const raw = m[2];
    if (raw.includes("?") || raw.includes("${") || raw.includes("<")) continue;
    const k = raw.trim();
    if (!k || /^\d+$/.test(k)) continue;
    if (!keys.has(k)) missing.set(k, (missing.get(k) || 0) + 1);
  }
}

for (const file of walk(path.join(__dirname, "src/data"))) {
  const text = fs.readFileSync(file, "utf8");
  const re = /["']([^"'\n]{6,})["']/g;
  let m;
  while ((m = re.exec(text))) {
    const k = m[1];
    if (/[àâäéèêëïîôùûüçÀ-ÿ]/.test(k) && k.length < 250 && !keys.has(k)) {
      missing.set("[data] " + k, (missing.get("[data] " + k) || 0) + 1);
    }
  }
}

const sorted = [...missing.keys()].sort();
console.log("Missing count:", sorted.length);
for (const k of sorted.slice(0, 120)) console.log(k);
if (sorted.length > 120) console.log("... and", sorted.length - 120, "more");
