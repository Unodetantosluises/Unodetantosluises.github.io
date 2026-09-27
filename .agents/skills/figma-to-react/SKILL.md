---
name: figma-to-react
description: Workflow for translating Figma screenshots and images into React components and SCSS with pixel-perfect accuracy.
---

# Figma to React + SCSS Conversion Workflow

When a user shares a Figma screenshot or design:

1. **Preliminary Visual Analysis:**
   - Extract the exact color palette, typography, font weights, and visible spacing.
   - Identify the visual hierarchy of elements (headings, subheadings, buttons, containers).

2. **JSX Structure:**
   - Create or modify the corresponding React component in `src/pages/` or `src/components/`.
   - Use semantic class names in accordance with the project's naming convention.

3. **SCSS Implementation:**
   - Write the styles in the associated SCSS file (following the convention of `_home.scss`, etc.).
   - Use consistent measurements (flexbox / grid) that respect the image's proportions.

4. **Validation:**
   - Verify that the visual intent of the original design has not been altered.
