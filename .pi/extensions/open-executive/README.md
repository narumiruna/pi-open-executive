# Open Executive for Pi

This project-local extension provides an Executive orchestrator and eight isolated department specialists.

Pi loads the extension automatically from `.pi/extensions/open-executive/index.ts` after the project is trusted.

Use ordinary conversation for Executive advice, or invoke `/council <question>` for an explicit cross-functional review.

Run `/oe-init` to create a Git-backed `.openexecutive/` company context.

Department agents are read-only and receive only Pi's `read`, `grep`, `find`, and `ls` tools.

A council can request all eight departments, with at most four child processes running concurrently.

Child agents load only this Extension, are confined to non-sensitive repository paths, and return output as untrusted advisory text.

They inherit built-in Pi models and providers; providers registered only by another runtime Extension are intentionally not forwarded to the isolated child.

Reload changes during development with `/reload`.
