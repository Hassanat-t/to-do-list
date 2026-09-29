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

## UI Style
- **Color palette** (primary):
  - Primary: `#3B82F6` (Blue 500)
  - Secondary: `#10B981` (Green 500)
  - Accent: `#F59E0B` (Amber 500)
  - Neutral dark: `#111827` (almost black)
  - Neutral light: `#F9FAFB`
- **Typography**:
  - Base font: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
  - Heading scale: `1.25rem` (h1), `1.125rem` (h2), `1rem` (h3), `0.875rem` (h4)
  - Body: `0.875rem` line-height, `1rem` font-size.
- **Spacing** (`rem` units): `0.25` (4px), `0.5` (8px), `1` (16px), `1.5` (24px), `2` (32px), `3` (48px).
- **Border radius**: `0.375rem` (default), `0.125rem` for small inputs.
- **Shadows**: use `0 1px 2px rgba(0,0,0,0.05)` for subtle elevation.

## Accessibility
- Ensure all interactive elements have an accessible name (aria-label or descriptive text).
- Contrast ratio minimum 4.5:1 for normal text, 3:1 for large text.
- Focus visible outline: `outline: 2px solid #3B82F6; outline-offset: 2px;`

## Animations
- Use `transition` property for simple state changes (duration 150-300ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`).
- Avoid heavy animations on the critical path; prefer CSS over JS.

---

*Enforce these rules via the project's ESLint and Prettier configs.*