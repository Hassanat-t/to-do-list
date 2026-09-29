# Taste Guide (Design & UX Taste)

This document captures the "design taste" – the aesthetic and experiential preferences that should guide the visual and interactive decisions for the to‑do product.

## Overall Philosophy
- **Minimal & Functional**: Clean lines, uncluttered interfaces. Every element should have a clear purpose.
- **Delightful Micro‑interactions**: Small, thoughtful animations that confirm actions without distracting (e.g., task swipe‑away, hover ripples).
- **Neutral Base, Accent Pops**: Most of the UI is muted (grays, whites) with strategic bursts of the primary accent color (`#3B82F6`) to draw attention toCTA (call‑to‑action) elements.

## Color & Contrast
- **Background**: `#F9FAFB` (very light gray) or pure white `#FFFFFF` for pages.
- **Surface cards**: `#FFFFFF` with a subtle `0 1px 2px rgba(0,0,0,0.05)` elevation.
- **Text primary**: `#111827` (almost black) for readability.
- **Text secondary**: `#6B7280` (gray‑500) for helper text, disabled states.
- **Accent**: Use `#3B82F6` for primary buttons, active links, and important icons.
- **Warning/Danger**: Use `#EF4444` (red‑500) sparingly for delete/remove actions.
- **Completed state**: Muted text color `#9CA3AF` (gray‑400) with a strike‑through decoration.

## Typography Hierarchy
- **Headings**: Use the defined scale (h1 1.25rem, h2 1.125rem, h3 1rem). Keep heading text under 2 lines when possible.
- **Body / task text**: `1rem` font‑size, line‑height `1.5`.
- **Captions / small print**: `0.75rem`, gray‑500.

## Spacing & Layout
- Use an 8‑point vertical rhythm: margins/paddings should be multiples of `0.25rem` (4px).
- Maximum content width: `24rem` (384px) on desktop, centered with `auto` margins.
- Grid: 12‑column layout for dashboards; for the simple to‑do list, a single‑column layout with occasional side‑padding of `1rem`.

## Component Aesthetic
- **Buttons**:
  - Primary: background `#3B82F6`, white text, hover `#2563EB`, focus ring `#3B82F6`.
  - Secondary: transparent border, text‑primary, hover background `#F3F4F6`.
  - Ghost: no background, underline on hover.
- **Inputs**: border `1px solid #D1D5DB`, focus border `#3B82F6`, padding `0.5rem`, rounded radius `0.375rem`.
- **Checkboxes/Radios**: small square, accent color check when selected.
- **Tags / Priority chips**: small padded buttons with background tint of respective priority color (e.g., `#F87171` for high, `#FBBF24` for medium, `#34D399` for low).

## Interaction Patterns
- **Add task**: Focus on the input field on page load; pressing Enter adds the task and clears input with a brief "bounce" animation.
- **Task hover**: slight `transform: translateY(-2px)` lift and shadow.
- **Swipe to delete** (mobile): user swipes right, a "Delete" button fades in with a quick `scale‑in` animation; action is irreversible unless undo snackbar appears.
- **Drag‑and‑reorder**: ghost outline follows finger, items snap into place with a subtle ease.

## Accessibility (Taste‑Driven)
- Keep contrast ratios as per style guide, but also ensure that color is not the only means of conveying state (e.g., show text "Completed" in addition to the strike‑through).
- Focus order follows visual flow; focus ring follows style guide.

## Global Mood Board (informal)
- Inspired by **Apple Reminders** and **Microsoft To‑Do**: rounded corners, generous whitespace, soft shadows, and a calm color palette that feels productive yet pleasant.

*Use this taste guide together with the Style Guide (style.md) to keep UI code consistent.*