#!/usr/bin/env python3
"""The Tired Dark Lord: A 100-Word Villain Monologue.

Writes one ~100-word monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
The speaker is Malachar, a dark lord whose nine-hundred-year eclipse scheme
keeps getting buried under castle administration: moat permits, council
quorums, goblin budget meetings. His exhaustion is never announced — it
leaks out through the pauses, the deflections, and the way the grand plan
keeps shrinking into paperwork.
"""

import os

MONOLOGUE = (
    "Right. The eclipse. The eclipse was supposed to be tonight — the one I waited "
    "nine hundred years for, the one the prophecy carved into the mountain in letters "
    "taller than my castle. And then Borin the steward arrives with a scroll. The moat "
    "needs dredging. The dredging needs a permit. The permit needs the Dark Council, "
    "and the Dark Council needs... a quorum. I have conquered kingdoms before "
    "breakfast, and now I am standing here, crown askew, listening to Grindle "
    "explain the drawbridge budget — wait. Hold that thought. I need to sit "
    "down. No, not on the throne. The throne has a meeting in it."
)


def main() -> None:
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", "/output")
    os.makedirs(out_dir, exist_ok=True)
    text = MONOLOGUE.strip()
    path = os.path.join(out_dir, "entry.txt")
    with open(path, "wb") as handle:
        handle.write(text.encode("utf-8"))
    os.chmod(path, 0o644)


if __name__ == "__main__":
    main()
