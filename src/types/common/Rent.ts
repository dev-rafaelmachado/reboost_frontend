export type Rent = {
  id: number
  startDate: Date
  endDate: Date | null
  cabinetFromId: number
  cabinetToId: number | null
  batteryId: number
  userId: number
}
