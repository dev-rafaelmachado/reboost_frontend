'use client'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '../ui/card'
import { useGetUser } from '@/hooks/query/useGetUserById'
import { userTestId } from '@/shared/userTest'
import { Recharge } from './Recharge'

export const Wallet = () => {
  const { data, isLoading } = useGetUser(userTestId)

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
