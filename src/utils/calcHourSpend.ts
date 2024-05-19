export const calcHourSpend = (
  beginDate: Date,
  endDate: Date | null,
): number => {
  const finalDate = endDate || new Date()
  const diff = finalDate.getTime() - beginDate.getTime()
  return Math.floor(diff / 1000 / 60 / 60)
}
