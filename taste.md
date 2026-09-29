# Taste Guide (Design & UX Taste)

This document captures the "design taste" – the aesthetic and experiential preferences that should guide the visual and interactive decisions for the to‑do product.

## Overall Philosophy
- **Minimal & Functional**: Clean lines, uncluttered interfaces. Every element should have a clear purpose.
- **Delightful Micro‑interactions**: Small, thoughtful animations that confirm actions without distracting (e.g., task swipe‑away, hover ripples).
- **Dark Glass, Accent Glow**: A near-black canvas lit by soft coloured light; content sits on frosted-glass cards. Colour is reserved for meaning: the blue→violet gradient marks primary actions and progress, and priority colours glow on each task.

## Color & Contrast
- **Background**: `#07080C` with fixed ambient radial glows (blue top-left, violet right, green bottom). Never a flat colour.
- **Surface cards**: translucent glass (`rgba(20,23,32,0.55)` + backdrop blur) with a 1px `rgba(255,255,255,0.08)` border and an inset top highlight. Task rows use a lighter, blur-free tint so long lists stay fast.
- **Text primary**: `#F3F4F6` for readability.
- **Text secondary**: `#9CA3AF` for helper text, counts, disabled states.
- **Accent**: the `#3B82F6 → #8B5CF6` gradient for the Add button, checked checkboxes, the progress ring and active counts.
- **Warning/Danger**: `#F87171`, shown only on hover of delete actions.
- **Completed state**: `#6B7280` text with a strike-through, the "Completed" caption, and a dimmed priority bar and chip.

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
  - Primary: pill, blue→violet gradient, white text, soft glow; lifts 1px and glows brighter on hover, scales to 0.97 when pressed.
  - Ghost: transparent, secondary text; faint white tint and primary text on hover.
  - Focus ring: `2px solid #3B82F6`, `2px` offset.
- **Composer**: one glass card holding a borderless input, the priority picker and the Add button; the whole card glows blue while focused.
- **Checkboxes**: round, with a 2px translucent white ring; checked state fills with the gradient, shows a white check and pops with a spring animation. The native input stays in the DOM for accessibility.
- **Priority picker**: three pill radio options, each with a glowing dot; the selected pill is tinted with its priority colour.
- **Priority chips & bars**: translucent chips tinted with the priority colour (`#F87171` high, `#FBBF24` medium, `#34D399` low), plus a 3px glowing bar on the task's left edge.
- **Filter tabs**: a glass segmented control with count badges; the active tab's badge uses the gradient.

## Interaction Patterns
- **Add task**: Focus on the input field on page load; pressing Enter adds the task and clears input with a brief "bounce" animation.
- **Task hover**: slight `transform: translateY(-2px)` lift and shadow.
- **Swipe to delete** (mobile): user swipes right, a "Delete" button fades in with a quick `scale‑in` animation; action is irreversible unless undo snackbar appears.
- **Drag‑and‑reorder**: ghost outline follows finger, items snap into place with a subtle ease.

## Accessibility (Taste‑Driven)
- Keep contrast ratios as per style guide, but also ensure that color is not the only means of conveying state (e.g., show text "Completed" in addition to the strike‑through).
- Focus order follows visual flow; focus ring follows style guide.

## Global Mood Board (informal)
- Inspired by **Linear** and **Things**: a calm dark workspace, frosted glass, precise type and restrained glow. It should feel focused and premium rather than playful.

*Use this taste guide together with the Style Guide (style.md) to keep UI code consistent.*