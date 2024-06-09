import { apiClient } from '@/services/apiClient'

import { UpdateUserDTO } from '@/types/dto/User/UpdateUserDTO'
import { UserDto } from '@/types/dto/User/UserDTO'

export type mutateUserParams = {
  id?: number
  body: UpdateUserDTO
}

export const mutateUser = async ({
  id,
  body,
}: mutateUserParams): Promise<UserDto> => {
  if(id) {
    const { data } = await apiClient.put<UserDto>(`/Users/${id}`, body)
    return data
  }
  const { data } = await apiClient.post<UserDto>('/Users', body)
  return data
}
