import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { COPY, PRIORITY_LABELS } from '../types/copy'
import type { Priority } from '../types/task'
import { DEFAULT_PRIORITY, PRIORITIES, isPriority } from '../types/task'
import { useTaskStore } from '../store/taskStore'

export default function AddTaskForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>(DEFAULT_PRIORITY)
  const [bounce, setBounce] = useState(false)
  const addTask = useTaskStore((state) => state.addTask)

  // taste.md: focus the input on page load.
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Enter in the input submits the form, as does the Add button.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addTask(trimmed, priority)
    setTitle('')
    setPriority(DEFAULT_PRIORITY)
    setBounce(true)
    inputRef.current?.focus()
  }

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (isPriority(event.target.value)) setPriority(event.target.value)
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        {COPY.inputLabel}
      </label>
      <input
        id="new-task"
        ref={inputRef}
        type="text"
        className={`input add-task__input${bounce ? ' is-bouncing' : ''}`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onAnimationEnd={() => setBounce(false)}
        placeholder={COPY.inputPlaceholder}
        autoComplete="off"
      />
      <label htmlFor="new-task-priority" className="sr-only">
        {COPY.priorityLabel}
      </label>
      <select id="new-task-priority" className="input add-task__priority" value={priority} onChange={handlePriorityChange}>
        {PRIORITIES.map((value) => (
          <option key={value} value={value}>
            {PRIORITY_LABELS[value]}
          </option>
        ))}
      </select>
      <button type="submit" className="button button--primary" disabled={!title.trim()}>
        {COPY.addButton}
      </button>
    </form>
  )
}
