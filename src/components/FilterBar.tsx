import { COPY, FILTER_LABELS } from '../types/copy'
import type { Filter } from '../types/task'
import { FILTERS } from '../types/task'
import Icon from './Icon'

interface FilterBarProps {
  filter: Filter
  counts: Record<Filter, number>
  onFilterChange: (filter: Filter) => void
  onClearCompleted: () => void
}

export default function FilterBar({ filter, counts, onFilterChange, onClearCompleted }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="glass segmented" role="group" aria-label={COPY.filterLabel}>
        {FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={`segmented__option${filter === value ? ' is-active' : ''}`}
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {FILTER_LABELS[value]}
            <span className="segmented__count">{counts[value]}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="button button--ghost clear-button"
        onClick={onClearCompleted}
        disabled={counts.completed === 0}
        title={COPY.clearCompleted}
      >
        <Icon name="trash" size={15} />
        {/* Label collapses to icon-only on narrow screens but stays the accessible name. */}
        <span className="clear-button__label">{COPY.clearCompleted}</span>
      </button>
    </div>
  )
}
