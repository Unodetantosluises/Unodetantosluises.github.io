---
name: sync-project-rules
description: Workflow to audit project structure (new pages, components, context, APIs, or libraries) and automatically update GEMINI.md while preserving design identity rules.
---

# Sync Project Guidelines (GEMINI.md)

Use this workflow whenever new features, pages, context providers, or API integrations are introduced and `GEMINI.md` needs to reflect the new state of the project.

## Workflow Steps

1. **Audit Workspace Changes:**
   - Check `src/pages/` and `src/components/` for new sections or modular components.
   - Check `src/context/` and `src/hooks/` for state patterns and custom hooks.
   - Check for API integrations, data fetching modules (e.g., `src/services/` or `src/api/`), or environment variables.
   - Review `package.json` for newly added dependencies.

2. **Evaluate Impact on Guidelines:**
   - Determine if new conventions are established (e.g., naming patterns, data contracts, route conventions).
   - Ensure the core **Visual Identity and Fidelity** section remains strictly intact (never remove or dilute the anti-generic style rules).

3. **Update `GEMINI.md`:**
   - Edit `GEMINI.md` to append or update relevant sections (e.g., `## Architecture & Routing`, `## API & Data Fetching`, `## State Management`).
   - Keep descriptions concise, token-efficient, and focused on constraints and conventions rather than verbose tutorials.

4. **Confirm with User:**
   - Summarize the newly documented guidelines or sections added to `GEMINI.md`.
