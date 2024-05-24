import { GetRentByIdComplete } from '@/@types/complete/GetRentByIdComplete'
import { fetchBatteryById } from '@/shared/query/fetchBatteryById'
import { fetchCabinetById } from '@/shared/query/fetchCabinetById'
import { fetchUserById } from '@/shared/query/fetchUserById'
import { fetchRents } from '@/shared/query/fetchRents'
import { useQuery } from '@tanstack/react-query'

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
  const rentsFilter = rentsRaw.filter((rent) => rent.userId === userId)

  const rentsComplete = rentsFilter.map(async (rent) => {
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
