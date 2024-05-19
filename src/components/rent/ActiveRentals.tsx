'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { GetRentByIdComplete } from '@/@types/dto/GetRentByIdComplete'
import { Button } from '../ui/button'
import { Chronometer } from './Chronometer'
import { calcHourSpend } from '@/utils/calcHourSpend'

export const ActiveRentals = () => {
  const [rents, setRents] = useState<GetRentByIdComplete[]>([
    {
      id: 1,
      startDate: new Date('2024-05-18T16:00:00.000Z'),
      endDate: null,
      cabinetFromId: 123,
      cabinetFrom: {
        id: 3,
        isActive: true,
        externalCode: 'A1',
        drawerNumber: 3,
        addressZipCode: '12345',
        addressStreet: 'Rua 1',
        addressNumber: '123',
        addressDistrict: 'Bairro 1',
        addressLatitude: 123.123,
        addressLongitude: 123.123,
      },
      cabinetToId: null,
      cabinetTo: null,
      batteryId: 1,
      Battery: {
        id: 1,
        isActivated: true,
        externalCode: 'B1',
        model: 'Model 1',
        brand: 'Brand 1',
        capacity: 100,
        pricePerHour: 1,
        totalPrice: 1,
      },
      userId: 1,
      user: {
        id: 1,
        isAdmin: false,
        isActive: true,
        billing: 100,
        name: 'User 1',
        email: 'email@email.com',
        password: 'password',
        lastLogin: '2021-07-01',
        createdAt: '2021-07-01',
      },
    },
  ])

  return (
    <div className="w-full">
      {rents.length === 0 ? (
        <p>No active rentals</p>
      ) : (
        rents.map((rent) => (
          <Card key={rent.id}>
            <CardHeader>
              <CardTitle>{rent.Battery.model}</CardTitle>
              <CardDescription>{rent.Battery.brand}</CardDescription>
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
                {calcHourSpend(rent.startDate, rent.endDate).toLocaleString(
                  'USD',
                  {
                    style: 'currency',
                    currency: 'USD',
                  },
                )}
              </p>
            </CardContent>
            <CardFooter>
              <Button>Take back</Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
