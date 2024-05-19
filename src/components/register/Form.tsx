'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const RegisterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid e-mail address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const FormRegister = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-4 lg:px-8"
      >
        <h1 className="text-3xl font-semibold text-energy-400">
          Create your account
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-energy-700">Name</FormLabel>
              <FormControl>
                <Input
                  className="text-energy-700"
                  placeholder="Enter your name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-energy-700">Username</FormLabel>
              <FormControl>
                <Input
                  className="text-energy-700"
                  placeholder="Enter your e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-energy-700">Password</FormLabel>
              <FormControl>
                <Input
                  className="text-energy-700"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-energy-600 hover:bg-energy-700"
          type="submit"
        >
          Register
        </Button>
        <p className="w-full text-center font-light text-gray-600">
          Do you already have an account?{' '}
          <a className="text-energy-400" href="/login">
            Log In
          </a>
        </p>
      </form>
    </Form>
  )
}
