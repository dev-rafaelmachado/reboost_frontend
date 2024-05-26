import { apiClient } from '@/services/apiClient'

import { RentDTO } from '@/types/dto/Rent/RentDTO'

export type MutateRentParams = {
  rentId?: number
  data: Partial<Omit<RentDTO | 'id', 'isActive'>>
}

export const mutateRent = async ({
  rentId,
  data,
}: MutateRentParams): Promise<RentDTO> => {
  if (rentId) {
    const res = await apiClient.put<RentDTO>(`/Rents/${rentId}`, data)
    return res.data
  }

  const res = await apiClient.post<RentDTO>('/Rents', data)
  return res.data
}
