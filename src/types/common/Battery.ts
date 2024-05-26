export type Battery = {
  id: number
  isActivated: boolean
  externalCode: string
  model: string | null
  brand: string | null
  capacity: number | null
  pricePerHour: number
  totalPrice: number
}
