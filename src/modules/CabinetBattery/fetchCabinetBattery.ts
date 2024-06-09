import { apiClient } from '@/services/apiClient'

import { Battery } from '@/types/common/Battery'
import { BatteryDTO } from '@/types/dto/Battery/BatteryDTO'

type getCabinetBatteryParams = {
  cabinetId: number
  battery?: {
    brand: string
    capacity: number
  }
}

export const fetchCabinetBattery = async (
  params: getCabinetBatteryParams,
): Promise<Battery[]> => {
  const { data } = await apiClient.get<BatteryDTO[]>(
    `/Cabinet/${params.cabinetId}/Batteries`,
    // `/CabinetBattery/${params.cabinetId}`,
    {
      params: params.battery && {
        brand: params.battery.brand,
        capacity: params.battery.capacity,
      },
    },
  )

  return data.map((battery) => ({
    id: battery.id,
    isActivated: battery.isActive,
    model: battery.model,
    brand: battery.brand,
    capacity: battery.capacity,
    pricePerHour: battery.pricePerHour,
    totalPrice: battery.totalPrice,
    externalCode: battery.externalCode,
  }))
}
