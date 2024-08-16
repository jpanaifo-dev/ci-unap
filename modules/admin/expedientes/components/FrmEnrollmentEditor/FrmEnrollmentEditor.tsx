'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { IEnrollment } from '@/types'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { ActionsData, ExpedienteData, InfoData, LevelData } from './sections'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { fetchCore } from '@/api'
import { HeaderSection } from '@/modules/admin/core'
interface IProps {
  data?: IEnrollment
}

function converToDate(date?: string) {
  if (date) {
    return new Date(date).toISOString().split('T')[0]
  }
  return ''
}

export const FrmEnrollmentEditor = (props: IProps) => {
  const { data: defaulData } = props
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const expediente = `Exp. ${defaulData?.expediente?.id} - ${defaulData?.expediente?.persona?.nombres} ${defaulData?.expediente?.persona?.apellido_paterno} ${defaulData?.expediente?.persona?.apellido_materno} - ${defaulData?.expediente?.programa?.nombre}`

  const methods = useForm<IEnrollment>({
    defaultValues: {
      id: defaulData?.id,
      expediente: defaulData
        ? {
            ...defaulData.expediente,
            expediente,
          }
        : {},
      fecha: converToDate(defaulData?.fecha),
      nivel: defaulData?.nivel,
      is_active: defaulData?.is_active,
      is_retired: defaulData?.is_retired,
    },
  })
  const router = useRouter()

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IEnrollment> = async (
    data: IEnrollment
  ) => {
    setIsOpen(false)
    setLoading(true)

    const newData = {
      ...data,
      fecha: data.fecha,
      expediente: Number(data.expediente?.id),
      nivel: Number(data.nivel?.id),
    }

    if (defaulData && defaulData?.id) {
      const res = await fetchCore(`gestor/Matricula/${defaulData.id}/`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      })

      if (res.status === 200) {
        toast.success('Matricula actualizada')
        handleCancel()
      } else {
        toast.error('Error al actualizar la matricula')
      }
    } else {
      const res = await fetchCore('gestor/Matricula/', {
        method: 'POST',
        body: JSON.stringify(newData),
      })

      if (res.status === 201) {
        toast.success('Matricula creada')
        handleCancel()
      } else {
        toast.error('Error al crear la matricula')
      }
    }
    setLoading(false)
  }

  const handleCancel = () => {
    methods.reset()
    router.refresh()
    router.push('/admin/expedientes/matriculas')
  }

  const title = defaulData?.id ? 'Editar matricula' : 'Crear matricula'
  const subtitle = defaulData?.id
    ? 'Editar matricula'
    : 'Crear una nueva matricula'

  return (
    <section className="section-panel w-full flex flex-col gap-4">
      <HeaderSection
        title={title}
        subtitle={subtitle}
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InfoData />
          <ExpedienteData />
          <LevelData />
          {defaulData?.id && <ActionsData />}
          <footer className="flex items-center gap-3 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isDisabled={loading}
              isLoading={loading}
            >
              {defaulData?.id ? 'Actualizar' : 'Crear'}
            </Button>

            <Button
              radius="sm"
              onPress={handleCancel}
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <DialogAction
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Confirmación"
        message="¿Está seguro de realizar esta acción?"
        onPress={() => handleFormSubmit(methods.getValues())}
      />
    </section>
  )
}
