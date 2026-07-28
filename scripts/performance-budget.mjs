import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const budget = {
  initialBytes: 200_000,
  initialRequests: 10,
  htmlBytes: 60_000,
  cssBytes: 50_000,
  javascriptBytes: 15_000
};

const initialFiles = [
  "index.html",
  "assets/css/site.css",
  "assets/js/site.js",
  "assets/img/favicon.svg",
  "site.webmanifest"
];

const sizes = Object.fromEntries(
  initialFiles.map((file) => [file, statSync(join(dist, file)).size])
);
const initialBytes = Object.values(sizes).reduce((total, size) => total + size, 0);
const failures = [];

if (initialBytes > budget.initialBytes) {
  failures.push(`Initial payload ${initialBytes} B exceeds ${budget.initialBytes} B`);
}
if (initialFiles.length > budget.initialRequests) {
  failures.push(`Initial request count ${initialFiles.length} exceeds ${budget.initialRequests}`);
}
if (sizes["index.html"] > budget.htmlBytes) {
  failures.push(`Homepage HTML exceeds ${budget.htmlBytes} B`);
}
if (sizes["assets/css/site.css"] > budget.cssBytes) {
  failures.push(`Site CSS exceeds ${budget.cssBytes} B`);
}
if (sizes["assets/js/site.js"] > budget.javascriptBytes) {
  failures.push(`Site JavaScript exceeds ${budget.javascriptBytes} B`);
}

const index = readFileSync(join(dist, "index.html"), "utf8");
if (/<script[^>]+src=["']https?:/i.test(index)) {
  failures.push("Homepage includes render-blocking third-party JavaScript");
}
if (/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:/i.test(index)) {
  failures.push("Homepage includes a third-party stylesheet");
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Performance budget passed: ${initialBytes} B across ${initialFiles.length} initial files`
);
