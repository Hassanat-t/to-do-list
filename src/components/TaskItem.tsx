import { COPY, PRIORITY_LABELS } from '../types/copy'
import type { Task } from '../types/task'
import Icon from './Icon'
import { useTaskStore } from '../store/taskStore'

interface TaskItemProps {
  task: Task
  onRemove: (task: Task) => void
}

export default function TaskItem({ task, onRemove }: TaskItemProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const checkboxId = `task-${task.id}`

  return (
    <li className={`task task--${task.priority}${task.completed ? ' task--completed' : ''}`}>
      <span className="check">
        <input
          id={checkboxId}
          type="checkbox"
          className="check__input"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={COPY.toggleLabel(task.title, task.completed)}
        />
        <span className="check__box" aria-hidden="true">
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
      </span>

      <label htmlFor={checkboxId} className="task__body">
        <span className="task__title">{task.title}</span>
        {/* taste.md: colour/strike-through must not be the only signal of state. */}
        {task.completed && <span className="task__status">{COPY.completed}</span>}
      </label>

      <span className={`chip chip--${task.priority}`}>
        <span className="priority-dot" aria-hidden="true" />
        {PRIORITY_LABELS[task.priority]}
      </span>

      <button type="button" className="task__delete" onClick={() => onRemove(task)} aria-label={COPY.deleteLabel(task.title)}>
        <Icon name="trash" size={16} />
      </button>
    </li>
  )
}
