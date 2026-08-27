---
name: department-management
description: Manages Git-backed Open Executive department charters, goals, notes, and decisions. Use when creating, reviewing, or updating files under .openexecutive/ or when the user asks for department status.
allowed-tools: read grep find ls edit write
---

# Department Management

Treat repository files as the source of truth.
Do not use a database, RAG system, embeddings, or external memory service.

## Locate Context

1. Inspect `.openexecutive/` with `find` and `ls`.
2. Search the repository with `grep` for authoritative plans, metrics, decisions, and owners.
3. Read only the relevant files.
4. State when required facts are absent or contradictory.

## Update Context

Only modify department files when the user asks to record or change information.
Preserve links to authoritative repository documents instead of copying their contents.
Keep changes small and reviewable.
Never infer a goal status, owner, deadline, or financial value without evidence.

Recommended files:

- `.openexecutive/company.md` for stable company context and links.
- `.openexecutive/decisions.md` for dated decisions and rationale.
- `.openexecutive/departments/<department>/charter.md` for mission and boundaries.
- `.openexecutive/departments/<department>/goals.md` for measurable outcomes.
- `.openexecutive/departments/<department>/notes.md` for current working context.

## Report

Summarize the evidence used, the conclusion, and any files changed.
For substantive business decisions, use `consult_department` before presenting the Executive's recommendation.
