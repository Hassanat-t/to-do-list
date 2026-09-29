import { COPY, PRIORITY_LABELS } from '../types/copy'
import type { Task } from '../types/task'
import { useTaskStore } from '../store/taskStore'

interface TaskItemProps {
  task: Task
  onRemove: (task: Task) => void
}

export default function TaskItem({ task, onRemove }: TaskItemProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const checkboxId = `task-${task.id}`

  return (
    <li className={`task${task.completed ? ' task--completed' : ''}`}>
      <input
        id={checkboxId}
        type="checkbox"
        className="task__checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={COPY.toggleLabel(task.title, task.completed)}
      />
      <label htmlFor={checkboxId} className="task__body">
        <span className="task__title">{task.title}</span>
        {/* taste.md: colour/strike-through must not be the only signal of state. */}
        {task.completed && <span className="task__status">{COPY.completed}</span>}
      </label>
      <span className={`chip chip--${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
      <button
        type="button"
        className="task__delete"
        onClick={() => onRemove(task)}
        aria-label={COPY.deleteLabel(task.title)}
      >
        ✕
      </button>
    </li>
  )
}
