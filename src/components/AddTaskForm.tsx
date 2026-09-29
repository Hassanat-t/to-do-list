import React, { useRef, useState } from 'react'
import { useTaskStore } from '../store/taskStore'

interface AddTaskFormProps {
  onTaskAdded: (task: { id: string; title: string; priority: string }) => void
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const { addTask: storeAddTask } = useTaskStore()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (title.trim()) {
        const task = { id: crypto.randomUUID(), title: title.trim(), priority }
        storeAddTask(title.trim(), priority)
        onTaskAdded(task)
        setTitle('')
        setPriority('medium')
        inputRef.current?.focus()
      }
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
        style={{
          flex: '1',
          padding: '0.5rem',
          border: '1px solid #D1D5DB',
          borderRadius: '0.375rem',
          fontSize: '1rem',
        }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        style={{
          padding: '0.5rem 0.75rem',
          border: '1px solid #D1D5DB',
          borderRadius: '0.375rem',
          background: 'white',
          minWidth: '80px',
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}