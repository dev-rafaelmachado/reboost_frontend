import { RentForm } from '@/components/rent/Form'

const HomePage = () => {
  return (
    <main>
      <header className="w-full bg-gray-200/60 px-6 py-4">
        <h1 className="text-4xl font-bold text-black">Home</h1>
      </header>
      <section className="mt-10 flex w-full px-6">
        <RentForm />
      </section>
    </main>
  )
}

export default HomePage
