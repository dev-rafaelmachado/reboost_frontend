import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  text: string
  url: string
  selected?: boolean
}

export const AsideItem = ({ icon, text, url, selected }: Props) => {
  return (
    <li className="w-full pl-4">
      <div
        data-selected={selected}
        className="flex w-full items-center justify-center rounded-l-md px-4 py-2 data-[selected=true]:bg-energy-700/90"
      >
        <a
          data-selected={selected}
          href={url}
          className="flex w-full items-center justify-start rounded-lg p-2 px-4 data-[selected=true]:bg-energy-500"
        >
          <span className="text-xl font-bold text-white">{icon}</span>
          <span className="ml-2 text-lg font-bold text-white">{text}</span>
        </a>
      </div>
    </li>
  )
}
