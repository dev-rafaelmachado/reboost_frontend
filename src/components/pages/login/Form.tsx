'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '@/contexts/AuthContext'

import { Button } from '../../shared/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '../../shared/ui/form'
import { Input } from '../../shared/ui/input'

const LoginSchema = z.object({
  email: z.string().email('Invalid e-mail address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const FormLogin = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  const { login } = useAuth()

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    login(values.email, values.password)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <h1 className="w-full text-center text-3xl font-semibold text-energy-800">
          Enter your account
        </h1>
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
              <FormDescription>
                <a className="text-energy-500" href="/forgot-password">
                  Forgot password?
                </a>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-energy-600 hover:bg-energy-700"
          type="submit"
        >
          Login now
        </Button>
        <p className="w-full text-center font-light text-gray-600">
          Don&apos;t have an account?{' '}
          <a className="text-energy-500" href="/register">
            Sign in
          </a>
        </p>
      </form>
    </Form>
  )
}
