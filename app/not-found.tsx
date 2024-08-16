'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NotFound() {
  const router = useRouter()

  const handleRedirect = () => {
    router.back()
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <section className="flex flex-col items-center justify-center">
        <Image
          src="/svg/404.svg"
          width={320}
          height={320}
          alt="not-fund"
        />
        <p className="font-bold text-lg sm:text-2xl lg:text-3xl">
          Error 404: Página no encontrada
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 bg-success-700 text-white px-6 py-3 rounded-full"
        >
          Regresar
        </button>
      </section>
    </main>
  )
}
