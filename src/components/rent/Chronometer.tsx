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

  return (
    <span>{`${make2Digits(time.hours)}:${make2Digits(time.minutes)}:${make2Digits(time.seconds)}`}</span>
  )
}

const make2Digits = (value: number) => {
  return value.toString().padStart(2, '0')
}
