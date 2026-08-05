import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const profile = JSON.parse(readFileSync(join(root, "data/profile.json"), "utf8"));

const requiredFiles = [
  "index.html",
  "cv.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets/css/site.css",
  "assets/css/cv.css",
  "assets/js/site.js",
  "assets/img/favicon.svg",
  "assets/img/delupe.png",
  "assets/img/Dialog_Axiata.png",
  "assets/img/virtusa.png",
  "assets/img/UOP.png",
  "assets/img/profile-engineering.webp",
  "assets/img/gmail.svg",
  "assets/img/phone.png",
  "assets/img/WhatsApp.svg",
  "3fbba454464e4fe7b57110f5f0757755.txt",
  "assets/documents/iso-27001-internal-auditor-certificate.pdf",
  "assets/documents/Degree Certificate - Redacted.pdf",
  "assets/documents/Transcript - Redacted.pdf",
  "assets/documents/Advance Level Certificate - Redacted.pdf"
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) {
    failures.push(`Missing build artifact: ${file}`);
  }
}

const index = readFileSync(join(dist, "index.html"), "utf8");
const cv = readFileSync(join(dist, "cv.html"), "utf8");
for (const value of [profile.name, profile.experience[0].company, profile.experience[1].company]) {
  const encodedValue = value.replaceAll("&", "&amp;");
  if (!index.includes(value) && !index.includes(encodedValue)) {
    failures.push(`Homepage is missing profile value: ${value}`);
  }
  if (!cv.includes(value) && !cv.includes(encodedValue)) {
    failures.push(`CV is missing profile value: ${value}`);
  }
}

for (const value of [
  "Technical Lead &amp; Information Security Manager",
  "Lead Software Engineer"
]) {
  if (!cv.includes(value)) {
    failures.push(`CV is missing positioning value: ${value}`);
  }
}

for (const [name, html] of [
  ["index.html", index],
  ["cv.html", cv]
]) {
  if (html.match(/\{\{[a-zA-Z0-9]+\}\}/)) {
    failures.push(`${name} contains an unresolved template token`);
  }
  if (/3\+\s+years/i.test(html) || /10\+\s+years/i.test(html)) {
    failures.push(`${name} contains a conflicting experience claim`);
  }
  if (/smtpjs|phpmailer|client_secret|recovery.?code/i.test(html)) {
    failures.push(`${name} contains a forbidden credential/contact implementation reference`);
  }
}

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const forbiddenArtifactPatterns = [
  /credential/i,
  /recovery.?code/i,
  /sast.?report/i,
  /\.php$/i,
  /node_modules/i,
  /IMPLEMENTATION_PLAN/i,
  /SECURITY_CLEANUP/i
];

for (const file of walk(dist)) {
  const path = relative(dist, file).replaceAll("\\", "/");
  if (forbiddenArtifactPatterns.some((pattern) => pattern.test(path))) {
    failures.push(`Forbidden file in public artifact: ${path}`);
  }
  // Credential scans are linked on demand and are allowed a larger per-file budget.
  const maxSize = path.startsWith("assets/documents/") ? 6_000_000 : 1_500_000;
  if (statSync(file).size > maxSize) {
    failures.push(`Public asset exceeds ${maxSize / 1_000_000} MB: ${path}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Build artifact checks passed");
