'use client'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { fetchCore } from '@/api'

import { IPerson } from '@/types'
import { ContactData } from './ContactData'
import { Button } from '@nextui-org/button'
import { DialogAction } from '@/components'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IProps {
  personData: IPerson
}

export const FrmContactData = (props: IProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { personData } = props

  const methods = useForm<IPerson>({
    defaultValues: personData,
  })

  const isChanged = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleSubmit: SubmitHandler<IPerson> = async (data) => {
    setOpen(false)
    setLoading(true)

    const res = await fetchCore(`gestor/Persona/${personData.id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success('Tu información de contacto ha sido actualizada')
    } else {
      toast.error('Ocurrió un error al actualizar tu información de contacto')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Información de contacto</h2>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-5"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <ContactData />
            <footer className="flex justify-end gap-2">
              <Button radius="sm">Cancelar</Button>
              <Button
                radius="sm"
                className="button-dark"
                type="submit"
                isDisabled={loading || !isChanged}
                isLoading={loading}
              >
                Guardar
              </Button>
            </footer>
          </form>
        </FormProvider>
      </div>
      <DialogAction
        isOpen={open}
        setOpen={setOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleSubmit)}
      />
    </>
  )
}
