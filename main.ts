// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one ~100-word monologue to /output/entry.txt.
// The speaker is a dark lord whose apocalypse keeps slipping a day
// because ruling a conquered kingdom is mostly paperwork.
// The tiredness lives in the pauses, the deflections and the rescheduled
// end of the world - never in a plain statement that he is weary.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence per line: the monologue is built from these pieces so the
// rhythm - short orders, interrupted thoughts, a trailing sting - survives.
const SENTENCES: string[] = [
  "Come in.",
  "Mind the third step - it bites.",
  "Sit.",
  "No, not there; the catacombs hum tonight, and the council of nine keeps sending ravens about the grain tithe, as if I had not already drowned their fields in black rain.",
  "I meant to unmake the sun this week.",
  "The eclipse was chalked, the choir rehearsed, the same blade that crowned me, sharp.",
  "Then the east granaries burned, and some clerk filed the ash as 'miscellaneous.'",
  "So.",
  "The world ends Thursday.",
  "Or Friday.",
  "Bring the ledger, the good ink, and the red wax - and tell my headsman his afternoon is free.",
  "Again.",
];

function buildMonologue(): string {
  return SENTENCES.join(" ");
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function checkGate(text: string): void {
  // The sealed gate accepts UTF-8 text of 1 to 600 characters, not only
  // whitespace. Fail loudly here rather than shipping an invalid entry.
  if (text.length < 1 || text.length > 600 || text.trim().length === 0) {
    throw new Error(`entry fails gate: ${text.length} chars`);
  }
  const words = wordCount(text);
  if (words < 90 || words > 110) {
    throw new Error(`entry off brief: ${words} words, want about 100`);
  }
}

function main(): void {
  const text = buildMonologue();
  checkGate(text);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  chmodSync(outPath, 0o644);
  console.log(`wrote ${outPath}: ${wordCount(text)} words, ${text.length} chars`);
}

main();
