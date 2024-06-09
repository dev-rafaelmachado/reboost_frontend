import { useQuery } from '@tanstack/react-query'

import { fetchBatteryById } from '@/modules/Battery/fetchBatteryById'
import { fetchCabinetById } from '@/modules/Cabinet/fetchCabinetById'
import { fetchRents } from '@/modules/Rent/fetchRents'
import { fetchUserById } from '@/modules/User/fetchUserById'

import { GetRentByIdComplete } from '@/types/complete/GetRentByIdComplete'

const QUERY_KEY = ['Rent']

type getRentParams = {
  userId?: number
}

const getRentComplete = async ({
  userId,
}: getRentParams): Promise<GetRentByIdComplete[]> => {
  const rentsRaw = await fetchRents({
    userId,
  })

  const rentsComplete = rentsRaw.map(async (rent) => {
    const user = await fetchUserById(rent.userId)
    const battery = await fetchBatteryById(rent.batteryId)
    const cabinetFrom = await fetchCabinetById(rent.cabinetFromId)
    const cabinetTo = rent.cabinetToId
      ? await fetchCabinetById(rent.cabinetToId)
      : null

    return {
      ...rent,
      user,
      battery,
      cabinetFrom,
      cabinetTo,
    }
  })

  const result = await Promise.all(rentsComplete)
  return result
}

export const useGetRents = (params: getRentParams) => {
  return useQuery<GetRentByIdComplete[], Error>({
    queryKey: QUERY_KEY,
    queryFn: () => getRentComplete(params),
  })
}
