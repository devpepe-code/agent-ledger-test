/**
 * Removes `.next` for a cold start. Run via `npm run dev:clean` only after every `next dev` on
 * this repo is stopped — deleting `.next` while a server is running can corrupt the build and
 * cause 500 “Internal Server Error” / missing chunks until you restart clean.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
} catch {
  /* ignore */
}
