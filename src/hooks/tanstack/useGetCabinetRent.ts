import { useQuery } from '@tanstack/react-query'

import { fetchBatteryById } from '@/modules/Battery/fetchBatteryById'
import { fetchCabinetById } from '@/modules/Cabinet/fetchCabinetById'
import { fetchCabinetBattery } from '@/modules/CabinetBattery/fetchCabinetBattery'

import { GetCabinetBatteryComplete } from '@/types/complete/GetCabinetBatteryComplete'

const QUERY_KEY = ['CabinetRent']

type getCabinetBatteryParams = {
  cabinetId: number
  battery?: {
    brand: string
    capacity: number
  }
}

export const getCabinetBatteryComplete = async ({
  cabinetId,
  battery,
}: getCabinetBatteryParams): Promise<GetCabinetBatteryComplete[]> => {
  const cabinetBatteryRaw = await fetchCabinetBattery({
    cabinetId,
    battery,
  })

  const cabinetBatteryCompletePromises = cabinetBatteryRaw.map(
    async (cabinetBattery) => {
      const battery = await fetchBatteryById(cabinetBattery.batteryId)
      const cabinet = await fetchCabinetById(cabinetBattery.cabinetId)

      return {
        ...cabinetBattery,
        battery,
        cabinet,
      }
    },
  )

  const cabinetBatteryComplete = await Promise.all(
    cabinetBatteryCompletePromises,
  )

  if (!battery) return cabinetBatteryComplete

  const cabinetBatteryCompleteFiltered = cabinetBatteryComplete.filter(
    (cabinetBattery) =>
      cabinetBattery.battery.brand === battery.brand &&
      cabinetBattery.battery.capacity === battery.capacity,
  )

  return cabinetBatteryCompleteFiltered
}

export const useGetCabinetBattery = (params: getCabinetBatteryParams) => {
  return useQuery<GetCabinetBatteryComplete[], Error>({
    queryKey: QUERY_KEY,
    queryFn: () => getCabinetBatteryComplete(params),
  })
}
