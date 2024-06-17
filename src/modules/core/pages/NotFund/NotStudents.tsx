'use client'
import { Button } from '@nextui-org/button'
import { IconMoodSad } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

export const NotStudents = () => {
  const router = useRouter()

  const handleRedirect = () => {
    router.back()
  }

  return (
    <section className="bg-gray-100 w-full rounded-lg border border-gray-200 max-w-4xl mx-auto">
      <div className="h-96 lg:h-[420px]">
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <IconMoodSad
            size={120}
            stroke={1}
            className="text-gray-500"
          />
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Sin estudiantes
            </h1>
            <p className="text-gray-500">
              No hay estudiantes asignados a este grupo
            </p>
          </section>
          <Button
            radius="sm"
            className="button-dark"
            onPress={handleRedirect}
          >
            Volver
          </Button>
        </div>
      </div>
    </section>
  )
}
