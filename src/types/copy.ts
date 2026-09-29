import type { Priority } from './task'

// User-facing strings, kept in one place per AGENT.md.
export const COPY = {
  appTitle: 'To-Do List',
  appTagline: 'A minimal task manager',
  inputLabel: 'New task',
  inputPlaceholder: 'What needs to be done?',
  priorityLabel: 'Priority',
  addButton: 'Add',
  listLabel: 'Tasks',
  emptyState: 'No tasks yet. Add one above to get started.',
  completed: 'Completed',
  taskDeleted: 'Task deleted',
  undo: 'Undo',
  toggleLabel: (title: string, completed: boolean) =>
    completed ? `Mark "${title}" as not completed` : `Mark "${title}" as completed`,
  deleteLabel: (title: string) => `Delete "${title}"`,
} as const

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}
