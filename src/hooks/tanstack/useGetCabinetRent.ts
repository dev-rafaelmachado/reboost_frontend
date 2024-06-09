import { useQuery } from '@tanstack/react-query'

import { fetchCabinetBattery } from '@/modules/CabinetBattery/fetchCabinetBattery'

import { Battery } from '@/types/common/Battery'

type getCabinetBatteryParams = {
  cabinetId: number
  battery?: {
    brand: string
    capacity: number
  }
}

export const useGetCabinetBattery = (params: getCabinetBatteryParams) => {
  return useQuery<Battery[], Error>({
    queryKey: [
      'CabinetRent',
      params.cabinetId,
      params.battery?.brand,
      params.battery?.capacity,
    ],
    queryFn: () => fetchCabinetBattery(params),
  })
}
