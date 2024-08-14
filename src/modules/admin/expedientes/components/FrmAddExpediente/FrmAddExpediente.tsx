'use client'
import { Button } from '@nextui-org/react'
import { IProceeding } from '@/types'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { DialogAction } from '@/components'
import { ActionsData, DiscountData, PersonData, ProgramData } from './sections'
import { fetchGestor } from '@/api'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { HeaderSection } from '@/modules/admin/core'

interface IProps {
  data?: IProceeding
}

export const FrmAddExpediente = (props: IProps) => {
  const { data: defaulData } = props

  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const methods = useForm<IProceeding>({
    defaultValues: defaulData,
  })
  const router = useRouter()
  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IProceeding> = async (
    data: IProceeding
  ) => {
    setIsOpen(false)
    setLoading(true)

    const newData = {
      ...data,
      descuento: data.descuento?.id || null,
      persona: data.persona?.id,
      programa: data.programa?.id,
      is_active: data?.is_active || false,
      is_graduated: data?.is_graduated || false,
      is_retirate: data?.is_retirate || false,
    }

    if (defaulData?.id) {
      const res = await fetchGestor(`Expediente/${defaulData.id}/`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      })
      if (res) {
        toast.success('Expediente actualizado')
        handleCancel()
      } else {
        toast.error('Error al actualizar el expediente')
      }
    } else {
      const res = await fetchGestor('Expediente/', {
        method: 'POST',
        body: JSON.stringify(newData),
      })
      if (res) {
        toast.success('Expediente creado')
        handleCancel()
      } else {
        toast.error('Error al crear el expediente')
      }
    }
    setLoading(false)
  }

  const handleCancel = () => {
    router.push('/admin/expedientes')
    methods.reset()
  }

  const title = defaulData?.id ? 'Editar expediente' : 'Nuevo expediente'
  const subtitle = defaulData?.id
    ? 'Complete los campos para editar el expediente'
    : 'Complete los campos para agregar un nuevo expediente'

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6 max-w-2xl w-full section-panel"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <HeaderSection
            title={title}
            subtitle={subtitle}
          />
          <ProgramData />
          <PersonData />
          <DiscountData />
          <ActionsData />
          <footer className="flex items-center gap-3 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isLoading={loading}
              isDisabled={loading || !isDirty}
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
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
