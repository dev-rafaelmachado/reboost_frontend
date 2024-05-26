import { FormLogin } from '@/components/pages/login/Form'

const LoginPage = () => {
  return (
    <main className="radial-energy flex h-screen w-screen flex-col p-4 py-8 lg:p-14">
      <h1 className="w-full text-center font-custom text-3xl font-bold italic text-white lg:text-left">
        REBOOST
      </h1>
      <section className="flex flex-1 items-center justify-center">
        <div className="w-full rounded-xl bg-white p-8 lg:w-1/3 lg:px-16 lg:py-10">
          <FormLogin />
        </div>
      </section>
    </main>
  )
}

export default LoginPage
