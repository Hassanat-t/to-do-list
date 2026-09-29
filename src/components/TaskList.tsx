import React from 'react'
import { useTaskStore } from '../store/taskStore'

interface TaskListProps {
  // no props needed; uses store directly
}

export const TaskList: React.FC<TaskListProps> = () => {
  const { tasks } = useTaskStore()

  // Debug: always render a visible placeholder
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#111827',
        background: '#F9FAFB',
        minHeight: '100px',
        border: '1px solid #D1D5DB',
        borderRadius: '0.375rem',
      }}
    >
      DEBUG TaskList running. Tasks count = {tasks.length}
    </div>
  )
}