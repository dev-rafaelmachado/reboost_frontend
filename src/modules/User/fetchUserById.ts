import { apiClient } from '@/services/apiClient'

import { User } from '@/types/common/User'
import { UserDto } from '@/types/dto/User/UserDTO'

export const fetchUserById = async (id: number): Promise<User> => {
  const { data } = await apiClient.get<UserDto>(`/Users/${id}`)
  return data
}
