import { FormRegister } from '@/components/pages/register/Form'

const RegisterPage = () => {
  return (
    <main className="flex h-screen w-screen">
      <section className="hidden w-1/2 flex-col justify-between bg-energy-800 p-14 lg:flex">
        <h1 className="font-custom text-3xl font-bold italic text-white">
          REBOOST
        </h1>
        <p className="inline-block bg-gradient-to-b from-white/100 to-white/40 bg-clip-text py-4 text-7xl text-transparent">
          Welcome to Reboost <br></br> Never worry about battery again
        </p>
      </section>
      <section className="flex w-full items-center justify-center lg:w-1/2">
        <FormRegister />
      </section>
    </main>
  )
}

export default RegisterPage
