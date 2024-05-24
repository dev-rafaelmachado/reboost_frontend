import { useQuery } from '@tanstack/react-query'
import { User } from '@/@types/common/User'
import { fetchUserById } from '@/shared/query/fetchUserById'

const QUERY_KEY = ['User']

export const useGetUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchUserById(id),
  })
}
