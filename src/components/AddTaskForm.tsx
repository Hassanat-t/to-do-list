import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { COPY, PRIORITY_LABELS } from '../types/copy'
import type { Priority } from '../types/task'
import { DEFAULT_PRIORITY, PRIORITIES } from '../types/task'
import Icon from './Icon'
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

  return (
    <form className={`glass composer${bounce ? ' is-bouncing' : ''}`} onSubmit={handleSubmit} onAnimationEnd={() => setBounce(false)}>
      <label htmlFor="new-task" className="sr-only">
        {COPY.inputLabel}
      </label>
      <input
        id="new-task"
        ref={inputRef}
        type="text"
        className="composer__input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={COPY.inputPlaceholder}
        autoComplete="off"
      />

      <div className="composer__row">
        <fieldset className="priority-picker">
          <legend className="sr-only">{COPY.priorityLabel}</legend>
          {PRIORITIES.map((value) => (
            <label key={value} className={`priority-option priority-option--${value}${priority === value ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name="priority"
                value={value}
                className="sr-only"
                checked={priority === value}
                onChange={() => setPriority(value)}
              />
              <span className="priority-dot" aria-hidden="true" />
              {PRIORITY_LABELS[value]}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="button button--primary" disabled={!title.trim()}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
          {COPY.addButton}
        </button>
      </div>
    </form>
  )
}
