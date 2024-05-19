export type RentDTO = {
  id: number
  isActive: boolean
  beginDate: string
  finishDate: string
  fkCabinetFromId: number
  fkCabinetToId: number
  fkUserId: number
  fkBatteryId: number
}
