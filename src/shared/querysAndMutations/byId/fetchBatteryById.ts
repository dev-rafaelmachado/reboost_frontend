import { Battery } from '@/@types/common/Battery'
import { BatteryDTO } from '@/@types/dto/BatteryDTO'
import { apiClient } from '@/services/apiClient'

export const fetchBatteryById = async (id: number): Promise<Battery> => {
  const { data } = await apiClient.get<BatteryDTO>(`/Battery/${id}`)
  return data
}
