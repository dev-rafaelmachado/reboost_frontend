'use client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/shared/ui/card'

import { useAuth } from '@/contexts/AuthContext'

import { useGetUser } from '@/hooks/tanstack/useGetUserById'

import { Recharge } from './Recharge'

export const Wallet = () => {
  const { user } = useAuth()
  const { data, isLoading } = useGetUser(user?.id || 1)
  return (
    <section className="mt-8 px-12">
      <Card className="bg-slate-200/80">
        <CardHeader>
          <CardTitle>My Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Current Balance</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>
              {data?.billing.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Recharge />
        </CardFooter>
      </Card>
    </section>
  )
}
