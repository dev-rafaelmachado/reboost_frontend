'use client'

import { GearSix, House, Wallet } from '@phosphor-icons/react/dist/ssr'
import { AsideItem } from './Item'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const items = [
  {
    icon: <House weight="bold" />,
    text: 'Home',
    url: '/dashboard/home',
  },
  {
    icon: <Wallet weight="bold" />,
    text: 'Billing',
    url: '/dashboard/billing',
  },
  {
    icon: <GearSix weight="bold" />,
    text: 'Settings',
    url: '/dashboard/settings',
  },
]

export const Aside = () => {
  const pathname = usePathname()
  const actualPage = pathname.split('/').pop()

  return (
    <aside className="hidden h-screen w-60 flex-col justify-between bg-energy-900 py-6 lg:flex">
      <div>
        <h1 className="w-full text-center font-custom text-3xl font-bold text-white">
          REBOOST
        </h1>
        <ul className="mt-12 flex flex-col gap-6">
          {items.map((item, index) => (
            <AsideItem
              key={index}
              {...item}
              selected={item.text.toLowerCase().trim() === actualPage}
            />
          ))}
        </ul>
      </div>
      <div className="px-5">
        <Button className="mt-6 h-12 w-full" variant="destructive">
          Logout
        </Button>
      </div>
    </aside>
  )
}
