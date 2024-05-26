import { useMutation } from '@tanstack/react-query'

import { updateUser } from '@/modules/User/updateUser'

const MUTATION_ID = ['updateUser']

export const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: updateUser,
    mutationKey: MUTATION_ID,
    onSuccess,
  })
}
