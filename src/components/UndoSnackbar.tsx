import { useEffect } from 'react'

import { COPY } from '../types/copy'

const AUTO_DISMISS_MS = 5000

interface UndoSnackbarProps {
  onUndo: () => void
  onDismiss: () => void
}

export default function UndoSnackbar({ onUndo, onDismiss }: UndoSnackbarProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="snackbar" role="status">
      <span>{COPY.taskDeleted}</span>
      <button type="button" className="snackbar__action" onClick={onUndo}>
        {COPY.undo}
      </button>
    </div>
  )
}
