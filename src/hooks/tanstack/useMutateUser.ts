import { useMutation } from '@tanstack/react-query'

import { mutateUser } from '@/modules/User/mutateUser'

const MUTATION_ID = ['mutateRent']

export const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: mutateUser,
    mutationKey: MUTATION_ID,
    onSuccess,
  })
}
