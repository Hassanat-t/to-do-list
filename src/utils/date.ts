const MORNING_END_HOUR = 12
const AFTERNOON_END_HOUR = 17

export const getGreeting = (date: Date): string => {
  const hour = date.getHours()
  if (hour < MORNING_END_HOUR) return 'Good morning'
  if (hour < AFTERNOON_END_HOUR) return 'Good afternoon'
  return 'Good evening'
}

export const formatLongDate = (date: Date): string =>
  date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
