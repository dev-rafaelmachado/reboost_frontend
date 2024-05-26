import { Battery } from '../common/Battery'
import { Cabinet } from '../common/Cabinet'

export type GetCabinetBatteryComplete = {
  id: number
  order: number
  cabinetId: number
  batteryId: number
  cabinet: Cabinet
  battery: Battery
}
