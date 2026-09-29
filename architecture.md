# Architecture Guide (To-Do Product)

This document describes the high-level architecture, technology stack, and data flow for the to-do product.

## 1. Architecture Style
- **Single Page Application (SPA)** using React (with TypeScript) and a client-side routing library (e.g., React Router).
- **State Management**: Zustand (lightweight) or Redux Toolkit (if more complex features are added later).
- **Data Persistence**: 
  - LocalStorage for quick MVP prototyping.
  - Plugable backend (Node.js + Express or Firebase) for remote sync in future iterations.
- **CSS-in-JS / Styling**: Styled Components or Tailwind CSS (configured per style.md and taste.md).
- **Testing**: Jest + React Testing Library for unit/integration; Cypress for end-to-end.

## 2. Folder Structure (aligned with style.md)
```
src/
  assets/         # static images, fonts
  components/     # reusable UI components (per style.md)
  hooks/          # custom React hooks
  pages/          # page-level components (route boundaries)
  store/          # state slice definitions (Zustand/Redux)
  types/          # TypeScript type definitions
  utils/          # pure utility functions (formatting, validation)
  styles/         # global styles, theme config
  api/            # API client functions (if backend enabled)
  App.tsx         # root component with Router
  main.tsx        # entry point
```

## 3. Data Model (MVP)
- **Task** interface:
  ```typescript
  interface Task {
    id: string;           // UUID v4
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high"; // optional, defaults to "medium"
    createdAt: Date;      // ISO string
    dueDate?: Date;       // optional due date
  }
  ```
- **Store shape** (Zustand example):
  ```typescript
  interface Store {
    tasks: Task[];
    addTask: (title: string, priority?: "low" | "medium" | "high") => void;
    toggleTask: (id: string) => void;
    removeTask: (id: string) => void;
    setTasks: (tasks: Task[]) => void;
  }
  ```

## 4. Key Flows
1. **Load App**: On mount, read tasks from LocalStorage (or fetch from API). Populate store.
2. **Add Task**: User types in input, presses Enter → `addTask` mutation → store updated → UI re-renders with animation (per taste.md).
3. **Toggle Complete**: Click checkbox → `toggleTask` → task `completed` flag flipped → UI shows strike‑through (per taste.md) and muted text color.
4. **Remove Task**: Hover reveals delete button → click → `removeTask` → task filtered out from list → optional undo snackbar.
5. **Filter/Sort**: (future) filter by priority or show/all/completed; sort by `createdAt` or `dueDate`.

## 5. API Contract (if backend added later)
- `GET /api/tasks` → returns `Task[]`
- `POST /api/tasks` → body `{ title: string, priority?: string }` → returns created `Task`
- `PATCH /api/tasks/:id` → body `{ completed: boolean }` → returns updated `Task`
- `DELETE /api/tasks/:id` → 204 No Content

## 6. Deployment
- **Vite** for dev server and building (fast HMR).
- **GitHub Pages** or **Vercel** for static hosting (if using LocalStorage only).
- **CI**: GitHub Actions to run lint (ESLint + style.md rules), type-check (tsc), and test (Jest).

## 7. Non-Goals (for MVP)
- No user authentication / accounts.
- No drag‑and‑reorder (out of scope).
- No due‑date reminders or notifications.
- No collaborative editing (single-user only).