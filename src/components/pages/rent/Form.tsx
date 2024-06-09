'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { Button } from '@/components/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/shared/ui/form'
import { Input } from '@/components/shared/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select'
import { Skeleton } from '@/components/shared/ui/skeleton'

import { useMutateRent } from '@/hooks/tanstack/useMutateRent'

import { userTest } from '@/shared/test/userTest'

import { fetchCabinetBattery } from '@/modules/CabinetBattery/fetchCabinetBattery'

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
  const cabinetCode = form.watch('cabinetCode')
  const brand = form.watch('brand')
  const capacity = form.watch('capacity')

  const queryClient = useQueryClient()
  const { isPending, mutate: mutateRent } = useMutateRent({
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({
        queryKey: ['Rent'],
      })
    },
  })

  const [open, setOpen] = useState(false)
  const [brands, setBrands] = useState<string[]>([])
  const [capacities, setCapacities] = useState<
    {
      label: string
      value: number
    }[]
  >([])

  const [battery, setBattery] = useState<{
    id: number
    model: string | null
    brand: string | null
    capacity: number | null
    pricePerHour: number | null
    totalPrice: number | null
    code: string
  } | null>(null)

  const fetchBattery = async (pBrand?: string, pCapacity?: string) => {
    const rawBrand = pBrand || brand
    const rawCapacity = pCapacity || capacity

    if (
      rawBrand === '' ||
      rawBrand === null ||
      rawBrand === undefined ||
      rawCapacity === '' ||
      rawCapacity === null ||
      rawCapacity === undefined
    )
      return

    const response = await fetchCabinetBattery({
      cabinetId: Number(cabinetCode),
      battery: {
        brand: rawBrand,
        capacity: Number(rawCapacity),
      },
    })

    if (response?.length < 1) return
    const battery = response[0]

    setBattery({
      id: battery.id,
      model: battery.model,
      brand: battery.brand,
      capacity: battery.capacity,
      pricePerHour: battery.pricePerHour,
      totalPrice: battery.pricePerHour,
      code: battery.externalCode,
    })
  }

  const fetchBatteryOptions = async () => {
    const optionsBattery = await fetchCabinetBattery({
      cabinetId: Number(cabinetCode),
    })

    if (optionsBattery === null) return

    const brands = optionsBattery
      .map((battery) => battery.brand)
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter((value) => value !== null) as string[]

    const capacities = optionsBattery
      .map((battery) => ({
        label: `${battery.capacity} mAh`,
        value: battery.capacity,
      }))
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter((value) => value !== null) as {
      label: string
      value: number
    }[]

    setBrands(brands)
    setCapacities(capacities)
  }

  const rentBattery = async () => {
    if (battery === null) return

    // 2024-05-19T12:15:19.7371349
    const now = new Date()
    const beginDate = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

    mutateRent(
      {
        body: {
          beginDate,
          fkCabinetFromId: Number(cabinetCode),
          fkUserId: userTest.id,
          fkBatteryId: battery.id,
        },
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      },
    )

    setOpen(false)
  }

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
                  <FormControl onChange={fetchBatteryOptions}>
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
              disabled={
                cabinetCode === '' ||
                cabinetCode === null ||
                cabinetCode === undefined
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      fetchBatteryOptions()
                    }}
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
              disabled={
                cabinetCode === '' ||
                cabinetCode === null ||
                cabinetCode === undefined
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      fetchBattery(undefined, value as string)
                    }}
                  >
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
              {battery.pricePerHour?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </h4>
            <h4 className="text-lg font-medium">
              Total Price:{' '}
              {battery.totalPrice?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </h4>
            <h4 className="text-lg font-medium">Code: {battery.code}</h4>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={!battery}
                  variant="default"
                  className="mt-4 bg-energy-600 text-white hover:bg-energy-700"
                >
                  Confirm Rent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirm Rent?</DialogTitle>
                <DialogDescription>
                  Rent the battery with the following details
                </DialogDescription>
                <h1 className="text-3xl font-bold">Model: {battery.model}</h1>
                <h4 className="text-lg font-medium">Brand: {battery.brand}</h4>
                <h4 className="text-lg font-medium">
                  Capacity; {battery.capacity} mAh
                </h4>
                <h4 className="text-lg font-medium">
                  Price per hour:{' '}
                  {battery.pricePerHour?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h4>
                <h4 className="text-lg font-medium">
                  Total Price:{' '}
                  {battery.totalPrice?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h4>
                <h4 className="text-lg font-medium">Code: {battery.code}</h4>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                    type="button"
                    variant="destructive"
                    className="mr-2"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={rentBattery}
                    type="button"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              variant="default"
              disabled
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
