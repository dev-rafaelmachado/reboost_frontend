import { Battery } from '../common/Battery'
import { Cabinet } from '../common/Cabinet'
import { User } from '../common/User'

export type GetRentByIdComplete = {
  id: number
  startDate: Date
  endDate: Date | null
  cabinetFromId: number
  cabinetFrom: Cabinet
  cabinetToId: number | null
  cabinetTo: Cabinet | null
  batteryId: number
  battery: Battery
  userId: number
  user: User
}
