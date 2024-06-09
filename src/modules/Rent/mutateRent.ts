import { apiClient } from '@/services/apiClient'

import { RentDTO } from '@/types/dto/Rent/RentDTO'

export type MutateRentParams = {
  id?: number
  body: Partial<Omit<RentDTO | 'id', 'isActive'>>
}

export const mutateRent = async ({
  id,
  body,
}: MutateRentParams): Promise<RentDTO> => {
  if (id) {
    const { data } = await apiClient.put<RentDTO>(`/Rents/${id}`, body)
    return data
  }

  const { data } = await apiClient.post<RentDTO>('/Rents', body)
  return data
}
