export const formatDate = (date: Date | string): string => {
  const newDate = new Date(date)

  if (isNaN(newDate.getTime())) {
    throw new Error('Invalid date')
  }

  const formatNumber = (num: number, length: number = 2): string =>
    num.toString().padStart(length, '0')

  const year = newDate.getFullYear()
  const month = formatNumber(newDate.getMonth() + 1)
  const day = formatNumber(newDate.getDate())
  const hours = formatNumber(newDate.getHours())
  const minutes = formatNumber(newDate.getMinutes())
  const seconds = formatNumber(newDate.getSeconds())

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
