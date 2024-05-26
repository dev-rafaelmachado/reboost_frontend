export const calcTimeSpend = (startDate: Date, endDate: Date | null) => {
  const finalDate = endDate || new Date()
  const diff = finalDate.getTime() - startDate.getTime()
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return {
    hours,
    minutes,
    seconds,
  }
}
