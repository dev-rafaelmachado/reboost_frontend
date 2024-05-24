'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useUpdateUser } from '@/hooks/mutation/useUpdateUser'
import { userTest, userTestId } from '@/shared/userTest'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const rechargeSchema = z.object({
  amount: z.string(),
  paymentMethod: z.string({
    message: 'Payment method is required',
  }),
})

export const Recharge = () => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['User'],
      })
    },
  })

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof rechargeSchema>>({
    resolver: zodResolver(rechargeSchema),
  })

  function onSubmit(values: z.infer<typeof rechargeSchema>) {
    console.log(values)
    updateUser({
      id: userTestId,
      body: {
        name: userTest.name,
        email: userTest.email,
        password: userTest.password,

        billing: Number(values.amount),
      },
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="submit">Recharge</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recharge Wallet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className=""
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Payment Method{' '}
                    <FormDescription>(select one)</FormDescription>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pix " />
                        </FormControl>
                        <FormLabel className="font-normal">Pix</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ticket" />
                        </FormControl>
                        <FormLabel className="font-normal">Ticket</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
