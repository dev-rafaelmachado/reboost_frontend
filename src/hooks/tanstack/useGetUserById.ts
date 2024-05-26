import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from '@tanstack/react-query'

import { fetchUserById } from '@/modules/User/fetchUserById'

import { User } from '@/types/common/User'

const QUERY_KEY = ['User']

export const useGetUser = (
  id: number,
  options?: Partial<DefinedInitialDataOptions<User, Error, User, QueryKey>>,
) => {
  return useQuery<User, Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchUserById(id),
    ...options,
  })
}
