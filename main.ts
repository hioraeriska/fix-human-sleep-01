// Fix Human Sleep: Funniest Patch Note — entry program.
// Writes one line of patch notes announcing that human sleep has been
// fixed, to $MAKEFUN_OUTPUT_DIR/entry.txt (or ./output/entry.txt).
// Gate: UTF-8 text, 1 to 160 characters, a single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Fixed a bug where users woke up at 3 a.m. to check whether they were still awake. They are now asleep. We checked.";

const MAX_CHARS = 160;

function validateEntry(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length < 1 || trimmed.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${trimmed.length}`
    );
  }
  if (trimmed.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return trimmed;
}

function main(): void {
  const text = validateEntry(LINE);
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.error(`wrote entry.txt (${text.length} chars)`);
}

main();
