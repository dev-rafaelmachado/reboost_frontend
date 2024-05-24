import { updateUser } from '@/shared/mutation/updateUser'
import { useMutation } from '@tanstack/react-query'

const MUTATION_ID = ['updateUser']

export const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: updateUser,
    mutationKey: MUTATION_ID,
    onSuccess,
  })
}
