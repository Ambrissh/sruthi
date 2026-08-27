import { readFile } from "node:fs/promises";

async function readStdin() {
  let source = "";

  for await (const chunk of process.stdin) {
    source += chunk;
  }

  return source;
}

const homepage = process.argv[2] === "--stdin"
  ? await readStdin()
  : await readFile(
      new URL("../src/migrated/source/index.html", import.meta.url),
      "utf8",
    );

const floatedImages = homepage.match(
  /<img\b[^>]*\bclass=["'](?:left|right)["'][^>]*>/gi,
);

if (!floatedImages?.length) {
  throw new Error("Expected the legacy homepage to contain its floated image.");
}

for (const image of floatedImages) {
  const reservesWidth = /\bwidth=["']\d+["']/i.test(image);
  const reservesHeight = /\bheight=["']\d+["']/i.test(image);

  if (!reservesWidth || !reservesHeight) {
    throw new Error(
      `Floated legacy images must reserve width and height before loading: ${image}`,
    );
  }
}

console.log("Legacy first-paint layout check passed.");
