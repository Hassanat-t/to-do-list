import { COPY } from '../types/copy'
import type { Task } from '../types/task'
import TaskItem from './TaskItem'
import { useTaskStore } from '../store/taskStore'

interface TaskListProps {
  onRemove: (task: Task) => void
}

export default function TaskList({ onRemove }: TaskListProps) {
  const tasks = useTaskStore((state) => state.tasks)

  if (tasks.length === 0) {
    return <p className="task-list__empty">{COPY.emptyState}</p>
  }

  return (
    <ul className="task-list" aria-label={COPY.listLabel}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRemove={onRemove} />
      ))}
    </ul>
  )
}
