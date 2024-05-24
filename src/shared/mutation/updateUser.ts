import { UpdateUserDTO } from '@/@types/dto/User/UpdateUserDTO'
import { UserDto } from '@/@types/dto/User/UserDTO'
import { apiClient } from '@/services/apiClient'

export type updateUserParams = {
  id: number
  body: UpdateUserDTO
}

export const updateUser = async ({
  id,
  body,
}: updateUserParams): Promise<UserDto> => {
  const { data } = await apiClient.put<UserDto>(`/Users/${id}`, body)
  return data
}
