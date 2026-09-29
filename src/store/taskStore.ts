import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Priority, Task } from '../types/task'
import { DEFAULT_PRIORITY } from '../types/task'

interface TaskState {
  tasks: Task[]
  addTask: (title: string, priority?: Priority) => void
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  restoreTask: (task: Task, index: number) => void
  setTasks: (tasks: Task[]) => void
}

const STORAGE_KEY = 'task-storage'

// crypto.randomUUID only exists in secure contexts (https / localhost).
const createId = (): string =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, priority = DEFAULT_PRIORITY) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: createId(),
              title,
              completed: false,
              priority,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      // Puts a removed task back where it was (used by the undo snackbar).
      restoreTask: (task, index) =>
        set((state) => {
          const tasks = [...state.tasks]
          tasks.splice(Math.min(index, tasks.length), 0, task)
          return { tasks }
        }),
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: STORAGE_KEY,
    },
  ),
)
