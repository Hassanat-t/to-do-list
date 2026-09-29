import { COPY } from '../types/copy'
import { formatLongDate, getGreeting } from '../utils/date'

const RING_SIZE = 64
const RING_STROKE = 6
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

interface DayHeaderProps {
  done: number
  total: number
}

export default function DayHeader({ done, total }: DayHeaderProps) {
  const now = new Date()
  const ratio = total === 0 ? 0 : done / total
  const percent = Math.round(ratio * 100)

  return (
    <header className="glass day-header">
      <div className="day-header__text">
        <p className="day-header__date">{formatLongDate(now)}</p>
        <h1 className="day-header__greeting">{getGreeting(now)}</h1>
        <p className="day-header__summary">
          {total === 0
            ? COPY.progressSummary(done, total)
            : `${COPY.tasksLeft(total - done)} · ${COPY.progressSummary(done, total)}`}
        </p>
      </div>

      <div
        className="ring"
        role="progressbar"
        aria-label={COPY.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} aria-hidden="true">
          <defs>
            <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle className="ring__track" cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} strokeWidth={RING_STROKE} />
          <circle
            className="ring__value"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            strokeWidth={RING_STROKE}
            stroke="url(#ring-gradient)"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - ratio)}
          />
        </svg>
        <span className="ring__label">{percent}%</span>
      </div>
    </header>
  )
}
