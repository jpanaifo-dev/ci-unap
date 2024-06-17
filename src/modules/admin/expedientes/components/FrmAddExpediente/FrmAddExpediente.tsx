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

  return (
    <>
      <main className="w-full flex flex-col items-center pt-4">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6 max-w-xl w-full border rounded-lg p-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
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
                isDisabled={loading}
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
      </main>
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
