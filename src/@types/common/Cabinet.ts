export type Cabinet = {
  id: number
  isActive: boolean
  externalCode: string
  addressZipCode: string | null
  addressStreet: string | null
  addressNumber: string | null
  addressDistrict: string | null
  addressLatitude: number | null
  addressLongitude: number | null
  drawerNumber: number
}
