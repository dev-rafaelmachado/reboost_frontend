import { Wallet } from '@/components/billing/Wallet'

const BillingsPage = () => {
  return (
    <main>
      <header className="w-full bg-gray-200/60 px-6 py-4">
        <h1 className="text-4xl font-bold text-black">Billing</h1>
      </header>
      <Wallet />
    </main>
  )
}

export default BillingsPage
