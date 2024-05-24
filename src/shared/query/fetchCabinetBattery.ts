import { CabinetBattery } from '@/@types/common/CabinetBattery'
import { CabinetBatteryDTO } from '@/@types/dto/CabinetBattery/CabinetBatteryDTO'
import { apiClient } from '@/services/apiClient'

type getCabinetBatteryParams = {
  cabinetId: number
  battery?: {
    brand: string
    capacity: number
  }
}

export const fetchCabinetBattery = async (
  params: getCabinetBatteryParams,
): Promise<CabinetBattery[]> => {
  const { data } = await apiClient.get<CabinetBatteryDTO[]>(
    // `/Cabinets/${params.cabinetId}/batteries`,
    `/CabinetBattery/${params.cabinetId}`,
    {
      params: params.battery && {
        brand: params.battery.brand,
        capacity: params.battery.capacity,
      },
    },
  )

  const cabinetBattery = data as unknown as CabinetBatteryDTO

  return [
    {
      id: cabinetBattery.id,
      order: cabinetBattery.order,
      cabinetId: cabinetBattery.fkCabinetId,
      batteryId: cabinetBattery.fkBatteryId,
    },
  ]

  return data.map((cabinetBattery) => ({
    id: cabinetBattery.id,
    order: cabinetBattery.order,
    cabinetId: cabinetBattery.fkCabinetId,
    batteryId: cabinetBattery.fkBatteryId,
  }))
}
