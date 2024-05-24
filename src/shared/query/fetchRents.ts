import { Rent } from '@/@types/common/Rent'
import { RentDTO } from '@/@types/dto/Rent/RentDTO'
import { apiClient } from '@/services/apiClient'
import { toSaoPauloTime } from '@/utils/toSaoPauloTime'

type getRentParams = {
  userId?: number
}

export const fetchRents = async (params: getRentParams): Promise<Rent[]> => {
  const { data } = await apiClient.get<RentDTO[]>(`/Rents`, {
    params: {
      userId: params.userId,
    },
  })

  return data.map((rent) => ({
    id: rent.id,
    isActive: rent.isActive,
    startDate: toSaoPauloTime(rent.beginDate),
    endDate: rent.finishDate ? toSaoPauloTime(rent.finishDate) : null,
    cabinetFromId: rent.fkCabinetFromId,
    cabinetToId: rent.fkCabinetToId,
    userId: rent.fkUserId,
    batteryId: rent.fkBatteryId,
  }))
}
