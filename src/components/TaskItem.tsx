import React from 'react'
import { useTaskStore } from '../store/taskStore'

interface TaskItemProps {
  task: {
    id: string
    title: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
  }
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, removeTask } = useTaskStore()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        marginBottom: '0.5rem',
        background: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: 'background 0.2s',
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        style={{
          marginRight: '0.75rem',
          transform: 'scale(1.2)',
        }}
      />
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#9CA3AF' : '#111827',
          fontWeight: task.completed ? 'normal' : 'bold',
          flex: '1',
        }}
      >
        {task.title}
      </span>

      {/* Priority chip */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.125rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          marginLeft: '0.5rem',
        }}
      >
        {/* Color mapping per priority */}
        {task.priority === 'high'
          ? { style: { background: '#F87171', color: 'white' } }
          : task.priority === 'medium'
          ? { style: { background: '#FBBF24', color: '#111827' } }
          : { style: { background: '#34D399', color: 'white' } }
        }{task.priority}
      </span>

      {/* Remove button visible on hover */}
      <button
        style={{
          opacity: 0,
          transition: 'opacity 0.2s',
          background: 'transparent',
          border: 'none',
          color: '#EF4444',
          fontSize: '0.875rem',
          cursor: 'pointer',
          padding: '0',
        }}
        onMouseEnter={() => {
          // we could set state to show, but for simplicity we just rely on parent hover
        }}
        onClick={(e) => {
          e.stopPropagation()
          removeTask(task.id)
        }}
      >
        ✕
      </button>
    </div>
  )
}