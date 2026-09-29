import { useCallback, useState } from 'react'

import { COPY } from '../types/copy'
import type { Task } from '../types/task'
import AddTaskForm from '../components/AddTaskForm'
import TaskList from '../components/TaskList'
import UndoSnackbar from '../components/UndoSnackbar'
import { useTaskStore } from '../store/taskStore'

interface RemovedTask {
  task: Task
  index: number
}

export default function HomePage() {
  const removeTask = useTaskStore((state) => state.removeTask)
  const restoreTask = useTaskStore((state) => state.restoreTask)
  const [lastRemoved, setLastRemoved] = useState<RemovedTask | null>(null)

  const handleRemove = (task: Task) => {
    const index = useTaskStore.getState().tasks.findIndex((t) => t.id === task.id)
    removeTask(task.id)
    setLastRemoved({ task, index })
  }

  const handleUndo = () => {
    if (lastRemoved) restoreTask(lastRemoved.task, lastRemoved.index)
    setLastRemoved(null)
  }

  const dismiss = useCallback(() => setLastRemoved(null), [])

  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">{COPY.appTitle}</h1>
        <p className="page__tagline">{COPY.appTagline}</p>
      </header>

      <AddTaskForm />
      <TaskList onRemove={handleRemove} />

      {lastRemoved && <UndoSnackbar key={lastRemoved.task.id} onUndo={handleUndo} onDismiss={dismiss} />}
    </main>
  )
}
