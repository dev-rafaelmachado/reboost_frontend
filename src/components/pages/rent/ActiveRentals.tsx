'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/shared/ui/card'
import { Skeleton } from '@/components/shared/ui/skeleton'

import { useAuth } from '@/contexts/AuthContext'

import { useGetRents } from '@/hooks/tanstack/useGetRents'

import { calcHourSpend } from '@/shared/utils/calcHourSpend'

import { Chronometer } from './Chronometer'
import { TakeBack } from './Takeback'

export const ActiveRentals = () => {
  const { user } = useAuth()
  const { data: rents } = useGetRents({ userId: user?.id })

  return (
    <div className="flex w-full justify-start gap-4">
      {rents?.length === 0 ? (
        <div>
          <Skeleton className="h-full w-80" />
          <Skeleton className="h-full w-80" />
          <Skeleton className="h-full w-80" />
        </div>
      ) : (
        rents?.map((rent) => (
          <Card key={rent.id} className="w-80">
            <CardHeader>
              <CardTitle>{rent.battery.model}</CardTitle>
              <CardDescription>{rent.battery.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Time spend:{' '}
                <Chronometer
                  beginDate={rent.startDate}
                  finalDate={rent.endDate}
                />
              </p>
              <p>
                Payment:{' '}
                {(
                  (calcHourSpend(rent.startDate, rent.endDate) + 1) *
                  rent.battery.pricePerHour
                ).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </CardContent>
            <CardFooter>
              <TakeBack rent={rent} />
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
