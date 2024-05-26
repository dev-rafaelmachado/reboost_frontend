import { apiClient } from '@/services/apiClient'

import { Cabinet } from '@/types/common/Cabinet'
import { CabinetDTO } from '@/types/dto/Cabinet/CabinetDto'

export const fetchCabinetById = async (id: number): Promise<Cabinet> => {
  const { data } = await apiClient.get<CabinetDTO>(`/Cabinet/${id}`)
  return data
}
