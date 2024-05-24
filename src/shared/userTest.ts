import { UserDto } from '@/@types/dto/User/UserDTO'

export const userTestId = 1

export const userTest: UserDto = {
  id: userTestId,
  isAdmin: true,
  isActive: true,
  billing: 100,
  name: 'JAMAICO',
  email: 'JAMAICO@email.com',
  password: '321321',
  lastLogin: '2021-10-10',
  createdAt: '2021-10-10',
}
