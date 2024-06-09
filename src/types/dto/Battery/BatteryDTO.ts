import { Battery } from '../../common/Battery'

export type BatteryDTO = Omit<Battery, 'isActivated'> & {
  isActive: boolean
}
