# Product Requirements Document (PRD) – To-Do Product

## 1. Product Vision
A minimal, beautiful, and fast task‑management app that helps individuals capture, organize, and complete daily tasks without friction. The app runs as a Single Page Application (SPA) with data persisted locally, with a path to optional backend sync.

## 2. Target Users
- Students needing quick lecture‑note actions.
- Professionals tracking short‑term action items.
- Anyone who wants a lightweight alternative to heavy project‑management tools.

## 3. MVP Scope (Minimum Viable Product)
| Feature | Description |
|---|---|
| **Task List View** | Displays all tasks; shows title, priority chip, completed strike‑through. |
| **Add Task** | Input field + "Add" button or Enter key. Optional priority selector (Low/Medium/High). |
| **Toggle Complete** | Click checkbox to mark completed; visual strike‑through and muted text color (per taste.md). |
| **Remove Task** | Hover to reveal delete button; confirm or undo snackbar. |
| **LocalStorage Persistence** | Tasks survive browser refresh. |
| **Filter & Progress** | All / Active / Done filter tabs with counts, a progress ring in the header, and "Clear completed" with undo. |
| **No Authentication** | Single‑user, no accounts. |

## 4. Out of Scope (for MVP)
- User accounts / login.
- Drag‑and‑reorder.
- Due dates / reminders.
- Collaboration / sharing.
- Light mode / theme toggle (the app ships dark-only with the glass theme).

## 5. User Stories (as GitHub issues)
1. **US‑1**: As a user, I can see an empty task list when the app loads.
2. **US‑2**: As a user, I can type a task title and press Enter to add it.
3. **US‑3**: As a user, I can toggle a task as completed and see it struck through with muted color.
4. **US‑4**: As a user, I can remove a task via a delete button that appears on hover.
5. **US‑5**: As a user, my tasks persist after I refresh the browser.

## 6. Acceptance Criteria
- UI matches `style.md` (color palette, spacing, typography) and `taste.md` (micro‑interactions, mood).
- All components are typed in TypeScript; `no-explicit-any` ESLint rule passes.
- Store uses Zustand with LocalStorage persistence; state updates reflect UI immediately.
- No console errors in Chrome DevTools console.
- Tests pass: minimum 1 unit test per core component (AddTask, TaskList, TaskItem) and 1 e2e smoke test.

## 7. Technical Requirements
- **Framework**: React 18 + TypeScript.
- **Router**: React Router v6.
- **State**: Zustand (with persist middleware).
- **Styling**: Tailwind CSS configured per `style.md` tokens, or CSS‑in‑JSTyled Components if preferred.
- **Build Tool**: Vite (fast HMR, ESBuild).
- **Deployment**: Static hosting (Vercel/Netlify) – the app is a pure static bundle.

## 8. Future Considerations (Post‑MVP)
- Backend sync (Firebase or Node+Express) – architecture.md already defines the API contract.
- Drag‑and‑reorder for custom task ordering.
- Due dates + calendar view.
- Light theme and theme toggle.
- Export/import as JSON.

## 9. Definition of Done for Each Feature
1. Component coded and typed.
2. Styles applied per `style.md` / `taste.md`.
3. Unit test written and passing.
4. ESLint + Prettier formatted.
5. Integrated into store (if state‑changing) and routed (if page).
6. Verified manually in browser (refresh, add, toggle, remove).

*This PRD guides the build phase. All code produced must respect the conventions in `style.md`, `taste.md`, `architecture.md`, and `AGENT.md`.*