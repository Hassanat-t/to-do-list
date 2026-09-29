import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'

export const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '24rem', margin: '0 auto', padding: '1rem' }}>
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          To-Do List
        </h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          A minimal task manager
        </p>
      </header>

      <AddTaskForm onTaskAdded={() => {}} />

      <TaskList />
    </div>
  )
}