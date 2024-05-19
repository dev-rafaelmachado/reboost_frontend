'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Chronometer } from './Chronometer'
import { calcHourSpend } from '@/utils/calcHourSpend'
import { userTestId } from '@/shared/userTest'
import { useGetRents } from '@/hooks/query/useGetRents'
import { Skeleton } from '../ui/skeleton'

export const ActiveRentals = () => {
  const { data: rents } = useGetRents({ userId: userTestId })

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
                  calcHourSpend(rent.startDate, rent.endDate) *
                  rent.battery.pricePerHour
                ).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Take back</Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
