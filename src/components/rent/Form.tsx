/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

const rentSchema = z.object({
  cabinetCode: z.string().min(3, 'Cabinet code must be at least 3 characters'),
  brand: z.string(),
  capacity: z.string(),
})

export const RentForm = () => {
  const form = useForm<z.infer<typeof rentSchema>>({
    resolver: zodResolver(rentSchema),
    defaultValues: {
      cabinetCode: '',
    },
  })

  const [brands, setBrands] = useState<string[]>([
    'Baseus',
    'Anker',
    'Xiaomi',
    'Samsung',
  ])
  const [capacities, setCapacities] = useState<
    {
      label: string
      value: number
    }[]
  >([
    { label: '5000 mAh', value: 5000 },
    { label: '10000 mAh', value: 10000 },
    { label: '20000 mAh', value: 20000 },
  ])

  const [battery, setBattery] = useState<{
    model: string
    brand: string
    capacity: number
    pricePerHour: number
    totalPrice: number
    code: string
  } | null>(
    null || {
      model: 'Power Bank 20000 mAh',
      brand: 'Anker',
      capacity: 20000,
      pricePerHour: 0.47,
      totalPrice: 40,
      code: 'AB1234',
    },
  )

  return (
    <>
      <div className="w-1/2 pr-8">
        <Form {...form}>
          <form className="space-y-4">
            <h1 className="w-full text-xl font-medium text-black">
              Rent a Power Bank
            </h1>
            <FormField
              control={form.control}
              name="cabinetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cabinet Code</FormLabel>
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
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter the brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter the capacity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {capacities.map((capacity) => (
                        <SelectItem
                          key={capacity.value}
                          value={capacity.value.toString()}
                        >
                          {capacity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <span className="mx-4 mt-8 h-72 w-0.5 bg-gray-600/40" />
      <div className="mt-12 w-1/2 px-8">
        {battery !== null ? (
          <div className="flex flex-col justify-around">
            <h1 className="text-3xl font-bold">Model: {battery.model}</h1>
            <h4 className="text-lg font-medium">Brand: {battery.brand}</h4>
            <h4 className="text-lg font-medium">
              Capacity; {battery.capacity} mAh
            </h4>
            <h4 className="text-lg font-medium">
              Price per hour:{' '}
              {battery.pricePerHour.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </h4>
            <h4 className="text-lg font-medium">
              Total Price:{' '}
              {battery.totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </h4>
            <h4 className="text-lg font-medium">Code: {battery.code}</h4>
            <Button
              variant="default"
              className="mt-4 bg-energy-600 text-white hover:bg-energy-700"
            >
              Confirm Rent
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-around gap-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
            <Button
              disabled
              variant="default"
              className="mt-4 bg-energy-600 text-white hover:bg-energy-700"
            >
              Confirm Rent
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
