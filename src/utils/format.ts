import { formatInTimeZone } from 'date-fns-tz'

const Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function formatDateToTimezone(
  date: string,
  format = 'yyyy-MM-dd HH:mm:ss'
) {
  return formatInTimeZone(date, Timezone, 'yyyy-MM-dd HH:mm:ss')
}
