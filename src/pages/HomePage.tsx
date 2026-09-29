import { useCallback, useState } from 'react'

import { COPY } from '../types/copy'
import type { Filter, RemovedTask, Task } from '../types/task'
import AddTaskForm from '../components/AddTaskForm'
import DayHeader from '../components/DayHeader'
import FilterBar from '../components/FilterBar'
import TaskList from '../components/TaskList'
import UndoSnackbar from '../components/UndoSnackbar'
import { useTaskStore } from '../store/taskStore'

interface UndoState {
  id: number // new id per removal so the snackbar timer restarts
  removed: RemovedTask[]
}

export default function HomePage() {
  const tasks = useTaskStore((state) => state.tasks)
  const removeTask = useTaskStore((state) => state.removeTask)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)
  const restoreTasks = useTaskStore((state) => state.restoreTasks)
  const [filter, setFilter] = useState<Filter>('all')
  const [undo, setUndo] = useState<UndoState | null>(null)

  const doneCount = tasks.filter((task) => task.completed).length
  const counts: Record<Filter, number> = {
    all: tasks.length,
    active: tasks.length - doneCount,
    completed: doneCount,
  }
  const visibleTasks = tasks.filter((task) =>
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed,
  )

  const handleRemove = (task: Task) => {
    const index = tasks.findIndex((t) => t.id === task.id)
    removeTask(task.id)
    setUndo({ id: Date.now(), removed: [{ task, index }] })
  }

  const handleClearCompleted = () => {
    const removed = tasks.flatMap((task, index) => (task.completed ? [{ task, index }] : []))
    clearCompleted()
    setUndo({ id: Date.now(), removed })
  }

  const handleUndo = () => {
    if (undo) restoreTasks(undo.removed)
    setUndo(null)
  }

  const dismiss = useCallback(() => setUndo(null), [])

  return (
    <main className="page">
      <DayHeader done={doneCount} total={tasks.length} />
      <AddTaskForm />
      <FilterBar filter={filter} counts={counts} onFilterChange={setFilter} onClearCompleted={handleClearCompleted} />
      <TaskList tasks={visibleTasks} filter={filter} onRemove={handleRemove} />

      {undo && (
        <UndoSnackbar key={undo.id} message={COPY.removed(undo.removed.length)} onUndo={handleUndo} onDismiss={dismiss} />
      )}
    </main>
  )
}
