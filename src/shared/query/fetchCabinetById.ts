import { Cabinet } from '@/@types/common/Cabinet'
import { CabinetDTO } from '@/@types/dto/Cabinet/CabinetDto'
import { apiClient } from '@/services/apiClient'

export const fetchCabinetById = async (id: number): Promise<Cabinet> => {
  const { data } = await apiClient.get<CabinetDTO>(`/Cabinet/${id}`)
  return data
}
