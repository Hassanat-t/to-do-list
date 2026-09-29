# Style Guide

## General Conventions
- Use **TypeScript** for all new code.
- Follow the **Airbnb JavaScript Style Guide** with TypeScript extensions.
- Use **ESLint** and **Prettier** configured in the project; commit formatted code.
- Component files: `*.tsx` for React components, `*.ts` for utilities/types.
- Naming conventions:
  - PascalCase for components (`AddTaskButton`), interfaces (`Task`), enums (`Priority`).
  - camelCase for functions, variables, parameters (`addTask`, `taskList`).
  - SCREAMING_SNAKE_CASE for constants (`MAX_TASK_LENGTH`).
- File organization:
  - `src/components/` – reusable UI components.
  - `src/pages/` – page-level components (route boundaries).
  - `src/hooks/` – custom React hooks.
  - `src/store/` – state management (Redux Toolkit or Zustand).
  - `src/utils/` – pure utility functions.
  - `src/types/` – TypeScript type definitions.
  - `src/styles/` – CSS/module styles or styled-components.

## UI Style (dark glass theme)
All tokens live as CSS custom properties in `src/styles/globals.css`; use the variables, not raw values.

- **Color palette**:
  - Background: `#07080C`, lit by three fixed radial glows (blue, violet, green)
  - Glass surface: `rgba(20, 23, 32, 0.55)` + `backdrop-filter: blur(20px) saturate(160%)`, border `rgba(255,255,255,0.08)`
  - Primary: `#3B82F6` (Blue 500) → `#8B5CF6` (Violet 500) gradient, with a soft blue glow
  - Text primary `#F3F4F6`, secondary `#9CA3AF`, completed `#6B7280`
  - Danger: `#F87171`
  - Priorities: high `#F87171`, medium `#FBBF24`, low `#34D399`
- **Typography**:
  - Base font: `Inter`, falling back to `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
  - Display (greeting): `1.75rem`, weight 700, `-0.02em` tracking
  - Body: `1rem` / line-height `1.5`; small `0.875rem`; caption `0.75rem`
- **Spacing** (`rem` units): `0.25` (4px), `0.5` (8px), `1` (16px), `1.5` (24px), `2` (32px), `3` (48px).
- **Border radius**: `1rem` cards, `0.75rem` task rows, pill (`999px`) for buttons, chips and segmented controls.
- **Shadows**: glass cards use an inset top highlight plus a deep soft drop shadow (`--shadow-card`); primary actions glow (`--glow-primary`).

## Accessibility
- Ensure all interactive elements have an accessible name (aria-label or descriptive text).
- Contrast ratio minimum 4.5:1 for normal text, 3:1 for large text.
- Focus visible outline: `outline: 2px solid #3B82F6; outline-offset: 2px;`

## Animations
- Use `transition` property for simple state changes (duration 150-300ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`).
- Avoid heavy animations on the critical path; prefer CSS over JS.

---

*Enforce these rules via the project's ESLint and Prettier configs.*