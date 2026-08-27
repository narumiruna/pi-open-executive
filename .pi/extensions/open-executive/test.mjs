import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const departments = [
  "strategy",
  "finance",
  "people",
  "legal",
  "operations",
  "marketing",
  "product",
  "board-comms",
];

for (const department of departments) {
  const content = await readFile(path.join(root, "agents", `${department}.md`), "utf8");
  assert.match(content, new RegExp(`^---\\nname: ${department}\\n`, "m"));
  assert.match(content, /^description: .+/m);
  assert.match(content, /^tools: read, grep, find, ls$/m);
  assert.ok(content.split("---").at(-1).trim().length > 200, `${department} prompt is too short`);
}

await stat(path.join(root, "skills", "department-management", "SKILL.md"));
await stat(path.join(root, "prompts", "council.md"));
await stat(path.join(root, "prompts", "oe-init.md"));

const extension = await readFile(path.join(root, "index.ts"), "utf8");
assert.match(extension, /name: "consult_department"/);
assert.match(extension, /pi\.on\("before_agent_start"/);
assert.match(extension, /pi\.on\("resources_discover"/);
assert.match(extension, /const MAX_CONSULTATIONS = 8/);
assert.match(extension, /const MAX_CONCURRENCY = 4/);
assert.match(extension, /PI_OPEN_EXECUTIVE_CHILD/);
assert.match(extension, /registerChildGuard/);
assert.match(extension, /"--no-extensions"/);
assert.match(extension, /extensionPath/);
assert.match(extension, /Promise\.allSettled/);
assert.match(extension, /process\.kill\(-child\.pid/);

console.log(`Validated ${departments.length} department agents and extension resources.`);
