import Image from 'next/image'
import { logoCiunap, svgLogin } from '@/assets'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex items-center h-screen">
        <section className="w-full hidden p-6 bg-success-100 h-full sm:flex flex-col items-center justify-center">
          <div className="">
            <div>
              <Image
                src={svgLogin}
                alt="Login"
                width={420}
                height={420}
              />
            </div>
            <div className="flex flex-col items-center max-w-sm justify-center">
              <h1 className="text-xl sm:text-3xl  font-bold">
                Centro de Idiomas UNAP
              </h1>
              <p className="text-center">
                <span>Universidad Nacional de la Amazonía Peruana</span>
                <span> Iquitos - Perú</span>
              </p>
            </div>
          </div>
        </section>
        <section className="w-full max-w-xl flex flex-col justify-center items-center">
          <header>
            <Image
              src={logoCiunap}
              alt="Logo CIUNAP"
              width={200}
              height={200}
            />
          </header>
          <main className="p-6 w-full flex flex-col items-center">
            {children}
          </main>
        </section>
      </main>
    </>
  )
}
