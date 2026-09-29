import { useEffect } from 'react'

import { COPY } from '../types/copy'
import Icon from './Icon'

const AUTO_DISMISS_MS = 5000

interface UndoSnackbarProps {
  message: string
  onUndo: () => void
  onDismiss: () => void
}

export default function UndoSnackbar({ message, onUndo, onDismiss }: UndoSnackbarProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="snackbar" role="status">
      <span>{message}</span>
      <button type="button" className="snackbar__action" onClick={onUndo}>
        <Icon name="undo" size={15} />
        {COPY.undo}
      </button>
    </div>
  )
}
