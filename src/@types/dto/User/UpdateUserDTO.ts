import { UserDto } from './UserDTO'

export type UpdateUserDTO = Omit<
  UserDto,
  'id' | 'isActive' | 'isAdmin' | 'createdAt' | 'lastLogin'
>
