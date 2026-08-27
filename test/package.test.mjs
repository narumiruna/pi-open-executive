import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DefaultResourceLoader, SettingsManager } from "@earendil-works/pi-coding-agent";

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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

const manifest = JSON.parse(await readFile(path.join(packageDir, "package.json"), "utf8"));
assert.equal(manifest.name, "pi-open-executive");
assert.equal(manifest.license, "Apache-2.0");
assert.deepEqual(manifest.pi.extensions, ["./src/index.ts"]);
assert.deepEqual(manifest.pi.skills, ["./skills"]);
assert.deepEqual(manifest.pi.prompts, ["./prompts"]);
assert.equal(manifest.piExtension.lifecycle, "stable");
assert.equal(manifest.peerDependencies["@earendil-works/pi-ai"], "*");
assert.equal(manifest.peerDependencies["@earendil-works/pi-coding-agent"], "*");
assert.equal(manifest.peerDependencies.typebox, "*");
for (const requiredPath of ["src", "agents", "prompts", "skills", "README.md", "LICENSE"]) {
	assert.ok(manifest.files.includes(requiredPath), `${requiredPath} must be published`);
}

for (const department of departments) {
	const content = await readFile(path.join(packageDir, "agents", `${department}.md`), "utf8");
	assert.match(content, new RegExp(`^---\\nname: ${department}\\n`, "m"));
	assert.match(content, /^description: .+/m);
	assert.match(content, /^tools: read, grep, find, ls$/m);
	assert.ok(content.split("---").at(-1).trim().length > 200, `${department} prompt is too short`);
}

await stat(path.join(packageDir, "skills", "department-management", "SKILL.md"));
await stat(path.join(packageDir, "prompts", "council.md"));
await stat(path.join(packageDir, "prompts", "oe-init.md"));

const extension = await readFile(path.join(packageDir, "src", "index.ts"), "utf8");
assert.match(extension, /name: "consult_department"/);
assert.match(extension, /pi\.on\("before_agent_start"/);
assert.doesNotMatch(extension, /pi\.on\("resources_discover"/);
assert.match(extension, /const MAX_CONSULTATIONS = 8/);
assert.match(extension, /const MAX_CONCURRENCY = 4/);
assert.match(extension, /PI_OPEN_EXECUTIVE_CHILD/);
assert.match(extension, /registerChildGuard/);
assert.match(extension, /"--no-extensions"/);
assert.match(extension, /extensionPath/);
assert.match(extension, /Promise\.allSettled/);
assert.match(extension, /process\.kill\(-child\.pid/);

const tempDir = await mkdtemp(path.join(os.tmpdir(), "pi-open-executive-loader-"));
const agentDir = path.join(tempDir, "agent");
const previousAgentDir = process.env.PI_CODING_AGENT_DIR;
const previousChildFlag = process.env.PI_OPEN_EXECUTIVE_CHILD;
try {
	await mkdir(agentDir, { recursive: true });
	process.env.PI_CODING_AGENT_DIR = agentDir;
	delete process.env.PI_OPEN_EXECUTIVE_CHILD;
	const loader = new DefaultResourceLoader({
		cwd: packageDir,
		agentDir,
		settingsManager: SettingsManager.inMemory({ packages: [packageDir] }),
	});
	await loader.reload();
	const loaded = loader.getExtensions();
	assert.deepEqual(loaded.errors, []);
	assert.equal(loaded.extensions.length, 1);
	const openExecutive = loaded.extensions[0];
	assert.deepEqual([...(openExecutive?.tools.keys() ?? [])], ["consult_department"]);
	assert.ok(openExecutive?.handlers.has("before_agent_start"));
	assert.equal(openExecutive?.handlers.has("resources_discover"), false);
	assert.ok(loader.getSkills().skills.some((skill) => skill.name === "department-management"));
	assert.ok(loader.getPrompts().prompts.some((prompt) => prompt.name === "council"));
	assert.ok(loader.getPrompts().prompts.some((prompt) => prompt.name === "oe-init"));
} finally {
	if (previousAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
	else process.env.PI_CODING_AGENT_DIR = previousAgentDir;
	if (previousChildFlag === undefined) delete process.env.PI_OPEN_EXECUTIVE_CHILD;
	else process.env.PI_OPEN_EXECUTIVE_CHILD = previousChildFlag;
	await rm(tempDir, { recursive: true, force: true });
}

console.log(`Validated the package, ${departments.length} department agents, and Pi entrypoint.`);
