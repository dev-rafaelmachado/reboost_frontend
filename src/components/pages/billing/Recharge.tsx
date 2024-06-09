'use client'

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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/shared/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/shared/ui/form'
import { Input } from '@/components/shared/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/shared/ui/radio-group'

import { useAuth } from '@/contexts/AuthContext'

import { useUpdateUser } from '@/hooks/tanstack/useMutateUser'

const rechargeSchema = z.object({
  amount: z.string().transform((v) => Number(v) || 0),
  paymentMethod: z.string({
    required_error: 'Payment method is required',
    message: 'Select a payment method',
  }),
})

export const Recharge = () => {
  const [open, setOpen] = useState(false)
  const { user, setUser } = useAuth()

  const queryClient = useQueryClient()
  const { mutate: updateUser } = useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['User'],
      })
      const value = form.getValues().amount
      setUser((prev) => {
        if (prev === null) return null
        return {
          ...prev,
          billing: prev.billing + Number(value),
        }
      })
      setOpen(false)
      toast.success('Wallet recharged successfully', {
        description: `Your wallet has been recharged with $${value}`,
        duration: 5000,
      })
    },
  })

  const form = useForm<z.infer<typeof rechargeSchema>>({
    resolver: zodResolver(rechargeSchema),
  })

  function onSubmit(values: z.infer<typeof rechargeSchema>) {
    if (user === null) return
    updateUser({
      id: user.id,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,

        billing: user.billing + Number(values.amount),
      },
    })
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
                    <Input className="" placeholder="Enter amount" {...field} />
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
