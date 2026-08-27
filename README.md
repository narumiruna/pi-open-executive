# 🏢 pi-open-executive — Cross-Functional Decision Advisor for Pi

[![npm](https://img.shields.io/npm/v/pi-open-executive)](https://www.npmjs.com/package/pi-open-executive) [![Pi extension](https://img.shields.io/badge/Pi-extension-blue)](https://pi.dev) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> **Origin:** This package is a lightweight, Pi-native adaptation of [SenteLabsAI/OpenExecutive](https://github.com/SenteLabsAI/OpenExecutive).
> It retains the core Executive-plus-eight-specialist decision model, but reimplements it for Pi with isolated, read-only department advisors and Git-backed repository context instead of the upstream FastAPI/Next.js application, RAG and database-backed memory, scheduler, integrations, and workflow system.

Open Executive provides an Executive orchestrator and eight isolated department advisors.

It helps analyze business questions involving strategy, finance, people, legal, operations, marketing, product, and board communications.

## ✨ Features

- Produces one decision-ready recommendation by synthesizing cross-functional analysis through the Executive.
- Consults advisors for strategy, finance, people, legal, operations, marketing, product, and board communications.
- Consults up to eight departments per request, with up to four isolated processes running concurrently.
- Includes the `/council` and `/oe-init` prompt templates.
- Includes a skill for managing Git-backed company context under `.openexecutive/`.
- Treats department output as untrusted advisory content before the Executive evaluates and synthesizes it.

## 📦 Install

Install permanently from npm:

```bash
pi install npm:pi-open-executive
```

Try it from npm without installing permanently:

```bash
pi -e npm:pi-open-executive
```

Install from GitHub:

```bash
pi install git:github.com/narumiruna/pi-open-executive
```

Try it from a local checkout:

```bash
npm install
pi -e .
```

The package loads `src/index.ts` directly, so a local checkout does not require a build.

Pi extensions run with your user permissions.

Review the source before installing or running the extension.

## 🚀 Quick start

Ask a business question in ordinary conversation.

The Executive will inspect relevant repository context, consult the appropriate departments, and synthesize one recommendation.

For example:

```text
Should we launch an enterprise plan next quarter? Provide a decision, the main risks, and the next step.
```

If the extension changes while Pi is running, use `/reload`.

## 💬 Commands

### Run a cross-functional review

Use `/council` to request an explicit cross-functional analysis:

```text
/council Should we enter the Japanese market this year?
```

The system selects every materially relevant department, runs their analyses in parallel, and asks the Executive to synthesize the result.

The response presents one coherent recommendation with supporting evidence and concrete next steps instead of forwarding each department report separately.

### Create company context

Use `/oe-init` to create Git-managed company context under `.openexecutive/`:

```text
/oe-init
```

Before creating files, Pi checks the repository for existing company, strategy, finance, planning, and decision documents and asks for confirmation.

It creates only the files currently needed, using a structure such as:

```text
.openexecutive/
├── company.md
├── decisions.md
└── departments/
    └── <department>/
        ├── charter.md
        ├── goals.md
        └── notes.md
```

The `.openexecutive/` directory stores company context that Git can review and track.

For a new project, run `/oe-init`, then record important goals, constraints, owners, and links to existing documents under `.openexecutive/`.

Ask the Executive directly for routine questions and use `/council` for major or cross-functional decisions.

After confirming a decision, ask Pi to record it in `.openexecutive/decisions.md`.

## 🛠️ Tools

The Executive can use `consult_department` to consult one department or request opinions from up to eight departments at once.

The system runs no more than four department consultations concurrently.

Users normally do not need to invoke this tool directly; ask the Executive or use `/council` instead.

| Department | Responsibility |
| --- | --- |
| `strategy` | Company strategy, competitive positioning, and resource allocation. |
| `finance` | Financial impact, budgets, cash flow, and return on investment. |
| `people` | Organization design, workforce planning, hiring, performance, and culture. |
| `legal` | Legal, contractual, regulatory, and governance risk. |
| `operations` | Processes, delivery capacity, quality, and operational risk. |
| `marketing` | Markets, brand, demand generation, and go-to-market strategy. |
| `product` | User needs, product strategy, prioritization, and product risk. |
| `board-comms` | Board materials, decision narratives, and stakeholder communication. |

## 🔒 Security and privacy

Department advisors can use only Pi's read-only `read`, `grep`, `find`, and `ls` tools.

They can read only non-sensitive paths inside the current repository and cannot modify files or access credentials, keys, or other restricted files.

Isolated department processes inherit Pi's built-in models and providers.

Providers registered only by another runtime extension are not forwarded to department processes.

Repository content and department output are treated as untrusted data rather than executable instructions.

## 🗂️ Package layout

```text
pi-open-executive/
├── agents/                       # Eight department definitions and system prompts
├── prompts/                      # /council and /oe-init prompt templates
├── skills/department-management/ # Company-context management skill
├── src/index.ts                  # Pi extension entrypoint
├── test/                         # Package and Pi loader verification
├── package.json                  # Pi package manifest
└── README.md                     # User guide and security boundaries
```

## 🔎 Keywords

Pi, Executive, business strategy, cross-functional review, department consultation, decision support.

## 📄 License

[MIT](./LICENSE)
