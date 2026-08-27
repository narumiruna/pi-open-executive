---
description: Initialize Git-backed Open Executive company context
---
Initialize a minimal `.openexecutive/` context for this repository.

Before writing anything, inspect the repository for existing company, strategy, financial, planning, and decision documents.
Do not duplicate information that already has an authoritative home.
Ask for confirmation before creating files.

When approved, create only the files currently needed from this structure:

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

Use links to existing repository documents instead of copying large bodies of text.
Keep every file suitable for Git review and normal text search.
