---
name: pixel-responsive-tuning
description: Workflow for auditing and tuning mobile responsiveness on canvas-based pixel-art layouts, ensuring touch targets, zero unwanted inner scroll, and fluid stacking without layout shifts.
---

# Pixel-Art Responsive Tuning Workflow

Use this workflow to audit, refine, and optimize mobile and tablet viewports on canvas-based pages wrapped in `Layout` and `BackgroundGrid`.

## Workflow Steps

1. **Canvas & Layout Transition Strategy:**
   - **Desktop Viewports (>= 768px):** Respect fixed or aspect-ratio canvas proportions (`aspect-ratio: W / H`) aligned with Figma frames.
   - **Mobile Viewports (< 768px):** Transition panels from fixed aspect ratios to natural vertical flow (`height: auto`, `min-height: 100vh`, `padding-bottom: 4rem`).
   - Maintain the vector `BackgroundGrid` without horizontal distortion or visual clipping.

2. **Elimination of Unwanted Inner Scroll:**
   - Inspect cards, lists, and content panels to ensure nested scrollbars are not introduced on mobile screens.
   - Replace fixed-height internal scrolling with natural vertical card stacking (`flex-direction: column` or `grid-template-columns: 1fr`).
   - Verify that primary action buttons (e.g., "Mas publicaciones", submit buttons) retain clear spacing (e.g., 4rem–5.5rem gap) from content above and never overlap cards.

3. **Touch Targets & Control Sizing:**
   - **Accessible Touch Minimums:** Ensure all interactive elements on mobile (`Controls`, `ReturnButton`, theme toggles, search inputs, pagination numbers) have a minimum touch area of `4.4rem × 4.4rem` (44px × 44px).
   - Increase icon sizes and button hitboxes for touch accuracy while preserving retro pixel aesthetics.

4. **Dynamic Density & Pagination Adaptation:**
   - Adjust pagination limits between breakpoints (e.g., 6 items per page on desktop down to 3 items per page on mobile) to avoid overwhelming smaller screens.
   - Stack search inputs and filter chips into full-width tap-friendly elements.

5. **Responsive Validation Checklist:**
   - Test against standard viewport widths (360px, 390px, 412px, and 768px breakpoint).
   - Check `overflow-x: hidden` on page roots to prevent horizontal wobble.
   - Ensure text readability (minimum `1.4rem`–`1.6rem` for body text) and verify high contrast in both Day and Night themes.
