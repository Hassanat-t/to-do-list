import { COPY, EMPTY_STATES } from '../types/copy'
import type { Filter, Task } from '../types/task'
import Icon from './Icon'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  filter: Filter
  onRemove: (task: Task) => void
}

export default function TaskList({ tasks, filter, onRemove }: TaskListProps) {
  if (tasks.length === 0) {
    const empty = EMPTY_STATES[filter]
    return (
      <div className="glass empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          <Icon name="sparkles" size={22} />
        </span>
        <p className="empty-state__title">{empty.title}</p>
        <p className="empty-state__body">{empty.body}</p>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label={COPY.listLabel}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRemove={onRemove} />
      ))}
    </ul>
  )
}
