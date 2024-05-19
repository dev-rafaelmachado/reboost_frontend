export type Rent = {
  id: number
  startDate: Date
  endDate: Date | null
  cabinetFromId: string
  cabinetToId: number | null
  batteryId: number
  userId: number
}
