# AGENT.md – Guidelines for AI Coding Assistants on This Project

This file tells AI assistants (e.g., Cline, Claude, GitHub Copilot) how to work effectively on the to-do product. Follow these conventions in every turn.

## 1. General Rules
- **Read the attached design docs first** – `style.md`, `taste.md`, `architecture.md` must inform every code change.
- **One file at a time** – do not modify two files in the same edit unless they are tightly coupled (e.g., a component and its styled variant).
- **TypeScript strict mode** – all new code must be typed; `any` is forbidden except in test mocks.
- **Import order** (per ESLint plugin): 
  1. External libraries (`react`, `zod`, etc.)
  2. Internal types (`.../types`)
  3. Internal utils (`.../utils`)
  4. Internal components/hooks/store (`.../...`)
  5. CSS/styles (last)

## 2. Coding Conventions (from style.md)
- **File naming**: `*.tsx` for components, `*.ts` for utilities/types/hooks.
- **Component format**: Functional components with hooks; default exports only.
- **Naming**: PascalCase for components, camelCase for functions/variables, SCREAMING_SNAKE_CASE for constants.
- **Formatting**: Code must pass `prettier`; commit only formatted code.
- **Accessibility**: Every interactive element must have an accessible name; focus ring per style.md.

## 3. State Management (from architecture.md)
- Use **Zustand** for global store (see `src/store/taskStore.ts`).
- Actions must be **synchronous** – no async inside reducers; fetch data in component `useEffect` then commit.
- Persist store to LocalStorage via `persist middleware` (configure once in store init).

## 4. Routing (from architecture.md)
- Use **React Router v6**.
- Routes defined in `src/pages/`; `App.tsx` wraps with `<BrowserRouter>` and `<Routes>`.
- Public routes: `/`, `/about` (future). No auth guards for MVP.

## 5. API Calls (if backend enabled)
- All API calls go to `src/api/` folder.
- Use **fetch** or **Axios** with a central `baseURL`.
- Responses typed via Zod schemas (or simple TypeScript interfaces).
- Error handling: show toast notifications (via `react-toastify` or custom).

## 6. Testing (from architecture.md)
- **Jest + React Testing Library** for unit tests.
- Test file naming: `ComponentName.test.ts` or `ComponentName.spec.ts`.
- Mock API calls with `msw` (optional) or manual `jest.fn()`.
- **Cypress** e2e tests in `cypress/` – smoke test: add task, toggle, remove.

## 7. Commit Messages
- Format: `<type>: <short description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Example: `feat: add task input with localStorage persistence`

## 8. What AI Should Do At Each Step
1. **Read the relevant MD files** (style, taste, architecture, AGENT) if not already provided in context.
2. **Plan the implementation** in a comment or short outline before writing code.
3. **Write the code** following the conventions (naming, imports, formatting).
4. **Run the linter/check** (`pnpm lint` or `npm run lint`) and fix any violations.
5. **Run tests** (`pnpm test` or `npm test`) and ensure new tests pass.
6. **Summarize** what was done and note any deviations from the guides.

## 9. Prohibited Patterns
- No `any` types (use `unknown` + narrowing or a specific interface).
- No inline styles without justification – use CSS modules / styled-components / Tailwind per style.md.
- No console.log in production code (use proper logging if needed).
- No hard‑coded strings without const extraction (move to `src/types/` or localization file later).

*By following AGENT.md, the AI assistant will produce consistent, maintainable, and on‑brand code for the to-do product.*