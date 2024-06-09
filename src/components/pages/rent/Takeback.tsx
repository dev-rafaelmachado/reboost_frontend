import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form'
import { Input } from '@/components/shared/ui/input'

import { useAuth } from '@/contexts/AuthContext'

import { useMutateRent } from '@/hooks/tanstack/useMutateRent'
import { useUpdateUser } from '@/hooks/tanstack/useMutateUser'

import { calcHourSpend } from '@/shared/utils/calcHourSpend'
import { formatDate } from '@/shared/utils/formatDate'
import { toGlobalTime } from '@/shared/utils/toGlobalTime'

import { GetRentByIdComplete } from '@/types/complete/GetRentByIdComplete'

const takeBackSchema = z.object({
  cabinetToId: z.string({
    required_error: 'Cabinet is required',
    message: 'Select a cabinet',
  }),
})

type Props = {
  rent: GetRentByIdComplete
}

export const TakeBack = ({ rent }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof takeBackSchema>>({
    resolver: zodResolver(takeBackSchema),
  })
  const { user, setUser } = useAuth()

  const queryClient = useQueryClient()
  const { mutate: mutateUser } = useUpdateUser({})
  const { mutate: mutateRent } = useMutateRent({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['User'],
      })
      queryClient.invalidateQueries({
        queryKey: ['Rent'],
      })
      if (user === null) return
      const value =
        calcHourSpend(rent.startDate, rent.endDate) +
        1 * rent.battery.pricePerHour
      mutateUser({
        id: user.id,
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          billing: user.billing - value,
        },
      })
      setUser((prev) => {
        if (prev === null) return null
        return {
          ...prev,
          billing: prev.billing - Number(value),
        }
      })
      setOpen(false)
      toast.success('Battery taken back successfully', {
        description: `The battery has been taken back successfully, the payment is $${value}`,
        duration: 5000,
      })
      setOpen(false)
    },
  })

  const onSubmit = (values: z.infer<typeof takeBackSchema>) => {
    mutateRent({
      id: rent.id,
      body: {
        beginDate: rent.startDate,
        finishDate: formatDate(toGlobalTime(new Date())),
        fkCabinetFromId: rent.cabinetFromId,
        fkCabinetToId: parseInt(values.cabinetToId),
        fkUserId: rent.userId,
        fkBatteryId: rent.batteryId,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Take back</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take back the battery</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="cabinetToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Cabinet to</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Enter the cabinet code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                onClick={() => {
                  setOpen(false)
                }}
                type="button"
                variant="destructive"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
