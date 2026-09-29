import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string, priority?: 'low' | 'medium' | 'high') => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, priority = 'medium') =>
        set((state) => {
          const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            priority,
            createdAt: new Date(),
          };
          return { tasks: [...state.tasks, newTask] };
        }),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setTasks: (tasks) => ({ tasks }),
    }),
    {
      name: 'task-storage', // key for localStorage
    }
  )
);