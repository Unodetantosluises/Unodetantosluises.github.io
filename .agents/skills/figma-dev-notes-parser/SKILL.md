---
name: figma-dev-notes-parser
description: Workflow for detecting, parsing, and implementing explicit Figma developer notes (e.g., [DEV NOTE ...], routing instructions, data constraints, and state specifications) before generating code.
---

# Figma Developer Notes & Specifications Workflow

Use this workflow whenever inspecting Figma frames or screenshots that contain developer annotations, sticky notes, or explicit text layers intended for engineering handoff.

## Workflow Steps

1. **Layer & Annotation Inspection:**
   - Proactively inspect text layers and frame annotations looking for developer-targeted tags such as:
     - `[DEV NOTE ...]`
     - `[ROUTING ...]` / `[NAVIGATION ...]`
     - `[DATA NOTE ...]` / `[CONSTRAINTS ...]`
     - `[STATE ...]` / `[INTERACTION ...]`
   - Never overlook or ignore text layers containing instructional prefixes.

2. **Specification Extraction & Categorization:**
   - **Routing & Navigation:**
     - Identify destination paths, URL query parameters (e.g., `/blog?tag=ux`), and back button targets.
     - Determine whether links are internal (`react-router-dom` `<Link>`) or external (`<a>`).
   - **Data Contracts & Constraints:**
     - Identify display limits (e.g., "show only the 3 most recent posts", "paginate 6 items per page").
     - Extract date formats (`DD-MM-YYYY`), sorting rules (descending timestamps), and entity models.
   - **Interactive States & Edge Cases:**
     - Note hover/focus states (e.g., overlays with transitions, focus rings).
     - Extract empty state guidelines (e.g., "No results found" search feedback).
   - **Theme Specifics:**
     - Identify Day vs. Night asset mappings (e.g., light/dark icons, theme-based SVG switches).

3. **Requirement Validation:**
   - Treat developer notes as binding functional specifications that accompany the visual design.
   - If an instruction in a developer note appears ambiguous or conflicts with visual positioning, clarify with the user before assuming behavior.

4. **Implementation & Verification:**
   - Implement data logic in centralized modules (`src/data/` or custom hooks) rather than hardcoding in JSX.
   - Ensure the rendered output satisfies both visual fidelity and the explicit functional rules defined in the note.
