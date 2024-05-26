import { useMutation } from '@tanstack/react-query'

import { mutateRent } from '@/modules/Rent/mutateRent'

const MUTATION_ID = ['mutateRent']

export const useMutateRent = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: mutateRent,
    mutationKey: MUTATION_ID,
    onSuccess,
  })
}
