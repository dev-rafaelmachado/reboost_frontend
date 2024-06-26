import { Aside } from '@/components/pages/aside'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex">
      <Aside />
      <main className="flex-1">{children}</main>
    </section>
  )
}
