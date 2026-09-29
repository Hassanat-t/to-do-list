export type Priority = 'low' | 'medium' | 'high'

export const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high']

export const DEFAULT_PRIORITY: Priority = 'medium'

export const isPriority = (value: string): value is Priority =>
  (PRIORITIES as readonly string[]).includes(value)

export type Filter = 'all' | 'active' | 'completed'

export const FILTERS: readonly Filter[] = ['all', 'active', 'completed']

export interface Task {
  id: string // UUID v4
  title: string
  completed: boolean
  priority: Priority // defaults to "medium"
  createdAt: string // ISO string (tasks round-trip through JSON in localStorage)
  dueDate?: string // optional ISO due date
}

// A task removed from the list, remembered with its position so undo can put it back.
export interface RemovedTask {
  task: Task
  index: number
}
