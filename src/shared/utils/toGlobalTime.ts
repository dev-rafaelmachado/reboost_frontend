export const toGlobalTime = (date: string | Date): Date => {
  const dateObj = new Date(date)
  dateObj.setHours(dateObj.getHours() + 3)
  return dateObj
}
