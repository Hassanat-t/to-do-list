export type Priority = 'low' | 'medium' | 'high'

export const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high']

export const DEFAULT_PRIORITY: Priority = 'medium'

export const isPriority = (value: string): value is Priority =>
  (PRIORITIES as readonly string[]).includes(value)

export interface Task {
  id: string // UUID v4
  title: string
  completed: boolean
  priority: Priority // defaults to "medium"
  createdAt: string // ISO string (tasks round-trip through JSON in localStorage)
  dueDate?: string // optional ISO due date
}
