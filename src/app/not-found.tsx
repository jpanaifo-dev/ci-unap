'use client'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  const handleRedirect = () => {
    router.back()
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      {/* <h2>Not Found: {data.name}</h2> */}
      <section>
        <p className="font-bold text-lg sm:text-2xl lg:text-3xl">
          Error 404: Página no encontrada
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 bg-primary text-white p-2 rounded-lg"
        >
          Regresar
        </button>
      </section>
    </main>
  )
}
