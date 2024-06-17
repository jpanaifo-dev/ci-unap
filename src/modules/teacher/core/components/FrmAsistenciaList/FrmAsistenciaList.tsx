'use client'
import { useState } from 'react'
import { IAlumno, IAsistenciaSave, IGroupData } from '@/types'
import { Button } from '@nextui-org/button'
import { useRouter, usePathname } from 'next/navigation'

import { fetchCore } from '@/api'
import { toast } from 'react-toastify'

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { TableAsistencia } from './TableAsistencia'
import { DialogAction } from '@/components'

interface IProps {
  dataAsistencias?: IGroupData
  asistencias?: IAlumno[]
  isView?: boolean
}

export const FrmAsistenciaList = (props: IProps) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { dataAsistencias, asistencias, isView } = props

  const router = useRouter()
  const pathname = usePathname()
  const path = pathname.replace(/\/nuevo/g, '')

  //capturar fecha del ultimo parametro de la url
  const dateUrl = pathname.split('/').pop()
  const isDate = dateUrl !== 'nuevo'

  const dateNow = new Date()
  const title = isView
    ? 'Registro de Asistencia'
    : `Registrar asistencia del ${dateNow.toLocaleDateString()}`

  const description = isView
    ? 'Listado de asistencias de los alumnos.'
    : 'Listado de asistencias registradas en el curso'

  const listDefault = isDate
    ? asistencias?.map((alumno) => ({
        inscripcion_id: alumno.inscripcion_id,
        asistencia: alumno.asistencia,
      }))
    : dataAsistencias?.alumnos?.map((alumno) => ({
        inscripcion_id: alumno?.inscripcion_id,
        asistencia: 'P',
      })) || []

  const methods = useForm<IAsistenciaSave>({
    defaultValues: {
      asistencias: listDefault,
    },
  })

  const handleExit = () => {
    if (isDate) {
      router.push(path)
    }
    router.back()
  }

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleSubmit: SubmitHandler<IAsistenciaSave> = async (data) => {
    setIsOpen(false)
    setLoading(true)
    if (isView) {
      return
    }

    const newData = data.asistencias.map((asistencia) => ({
      ...asistencia,
      asistencia: asistencia.asistencia.toUpperCase(),
    }))

    const response = await fetchCore('gestor/save_asistencia/', {
      method: 'POST',
      body: JSON.stringify(newData),
    })

    if (response.ok) {
      toast.success(
        <main className="flex flex-col gap-1">
          <h1 className="text-sm font-bold">
            Asistencia registrada correctamente
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Fecha: {dateNow.toLocaleDateString()}
          </p>
        </main>
      )
      handleExit()
    } else {
      toast.error('Ocurrió un error al guardar la asistencia')
    }
    setLoading(false)
  }

  return (
    <main className="w-full flex flex-col items-center">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-5 items-center w-full max-w-5xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <main className="w-full p-4 border rounded-lg">
            <header className="w-full p-4 bg-gray-100 rounded-t-lg">
              <div className="w-full">
                <h1 className="text-center text-xl font-bold text-gray-800">
                  {title}
                </h1>
                <p className="text-center text-xs text-gray-500 font-medium">
                  {description}
                </p>
              </div>
            </header>
            <TableAsistencia
              alumnos={dataAsistencias?.alumnos || asistencias}
              isDisabled={isView}
            />
          </main>
          <footer className="w-full flex items-center justify-end gap-3">
            <Button
              radius="sm"
              onPress={handleExit}
            >
              {isView ? 'Salir' : 'Cancelar'}
            </Button>
            {!isView && (
              <Button
                radius="sm"
                className="button-dark"
                type="submit"
                isDisabled={loading}
                isLoading={loading}
              >
                Registrar asistencia
              </Button>
            )}
          </footer>
        </form>
      </FormProvider>
      <DialogAction
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Guardar asistencia"
        message="¿Estás seguro de guardar la asistencia?"
        onPress={methods.handleSubmit(handleSubmit)}
      />
    </main>
  )
}
