import { User } from '@/@types/common/User'
import { UserDto } from '@/@types/dto/UserDTO'
import { apiClient } from '@/services/apiClient'

export const fetchUserById = async (id: number): Promise<User> => {
  const { data } = await apiClient.get<UserDto>(`/Users/${id}`)
  return data
}
