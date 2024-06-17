'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { IAsistencia, IInscriptions } from '@/types'
import { fetchCore } from '@/api'
import { toast } from 'react-toastify'
import { Actions } from './Actions'
import { DialogAction } from '@/components'
import { useState } from 'react'

interface IProps {
  dataInscription?: IInscriptions
}

export const FrmAsistenciaEditor = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { dataInscription } = props

  const methods = useForm<IAsistencia>({
    defaultValues: {
      asistencia: 'P',
    },
  })

  const dateNow = new Date()

  const handleExit = () => {
    router.back()
  }

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleSubmit: SubmitHandler<IAsistencia> = async (data) => {
    setIsOpen(false)
    const { asistencia, ...res } = data
    const newData = {
      ...res,
      is_presente: asistencia === 'P',
      is_justificado: asistencia === 'J',
      is_falta: asistencia === 'F',
      inscripcion: dataInscription?.id,
    }

    const response = await fetchCore(`gestor/Asistencia/`, {
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
          <p className="text-xs text-gray-500 font-medium">
            Alumno: {dataInscription?.matricula?.expediente?.persona?.nombres}{' '}
            {dataInscription?.matricula?.expediente?.persona?.apellido_paterno}{' '}
            {dataInscription?.matricula?.expediente?.persona?.apellido_materno}
          </p>
        </main>
      )
      handleExit()
    } else {
      toast.error('Error al guardar las notas')
    }
  }

  return (
    <>
      <main className="flex flex-col gap-5 w-full max-w-2xl border rounded-lg">
        <header className="flex flex-col gap-3 bg-gray-100 p-4 pt-6 border-b-2">
          <h1 className="font-bold text-center uppercase">
            Registro de asistencia. Fecha: {dateNow.toLocaleDateString()}
          </h1>
          <p className=" text-sm font-medium uppercase text-center">
            Alumno: {dataInscription?.matricula?.expediente?.persona?.nombres}{' '}
            {dataInscription?.matricula?.expediente?.persona?.apellido_paterno}{' '}
            {dataInscription?.matricula?.expediente?.persona?.apellido_materno}
          </p>
        </header>
        <section className="p-4 bg-warning-50 border border-warning-500 rounded-md m-4">
          <p className="text-warning-500 font-medium text-sm">
            Recuerda que una vez registrado, no podrás modificarlo.
          </p>
        </section>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Actions />
            <footer className="flex items-center gap-3 justify-end">
              <Button
                onPress={handleExit}
                radius="sm"
              >
                Cancelar
              </Button>
              <Button
                // onClick={method.handleSubmit(onSubmit)}
                type="submit"
                radius="sm"
                className="button-dark"
              >
                Guardar
              </Button>
            </footer>
          </form>
        </FormProvider>
      </main>
      <DialogAction
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Registro de asistencia"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleSubmit)}
      />
    </>
  )
}
