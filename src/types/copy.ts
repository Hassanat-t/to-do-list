import type { Filter, Priority } from './task'

// User-facing strings, kept in one place per AGENT.md.
export const COPY = {
  appTitle: 'To-Do List',
  inputLabel: 'New task',
  inputPlaceholder: 'What needs to be done?',
  priorityLabel: 'Priority',
  addButton: 'Add',
  listLabel: 'Tasks',
  filterLabel: 'Filter tasks',
  clearCompleted: 'Clear completed',
  completed: 'Completed',
  undo: 'Undo',
  progressLabel: 'Progress',
  tasksLeft: (count: number) =>
    count === 0 ? 'Nothing left to do' : `${count} ${count === 1 ? 'task' : 'tasks'} left`,
  progressSummary: (done: number, total: number) =>
    total === 0 ? 'Add your first task below' : `${done} of ${total} done`,
  removed: (count: number) => (count === 1 ? 'Task deleted' : `${count} tasks cleared`),
  toggleLabel: (title: string, completed: boolean) =>
    completed ? `Mark "${title}" as not completed` : `Mark "${title}" as completed`,
  deleteLabel: (title: string) => `Delete "${title}"`,
} as const

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Done',
}

export const EMPTY_STATES: Record<Filter, { title: string; body: string }> = {
  all: { title: 'A clean slate', body: 'Add a task above to get started.' },
  active: { title: 'All caught up', body: 'Every task is done. Nice work.' },
  completed: { title: 'Nothing done yet', body: 'Tick off a task and it will show up here.' },
}
