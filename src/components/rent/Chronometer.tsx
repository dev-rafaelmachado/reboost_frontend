import { calcTimeSpend } from '@/utils/calcTimeSpend'
import { useState, useEffect } from 'react'

type Props = {
  beginDate: Date
  finalDate: Date | null
}
export const Chronometer = ({ beginDate, finalDate }: Props) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(() => {
        return calcTimeSpend(beginDate, finalDate)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [beginDate, finalDate])

  return <span>{`${time.hours}:${time.minutes}:${time.seconds}`}</span>
}
