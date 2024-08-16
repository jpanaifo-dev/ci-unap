'use client'
import { useState } from 'react'
import { Button, Divider } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { IPerson } from '@/types'
import { DialogAction } from '@/components'
import {
  DocumentData,
  PersonalData,
  LocationData,
  StatusData,
} from './sections'
import { ContactData } from './sections/ContactData'
import { useRouter } from 'next/navigation'

import { fetchCore } from '@/api'
import { toast } from 'react-toastify'
interface IProps {
  data?: IPerson
}

export const FrmAddPerson = (props: IProps) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const { data: defauldata } = props

  const router = useRouter()
  const methods = useForm<IPerson>({
    defaultValues: defauldata,
  })
  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    setOpen(false)
    setLoading(true)

    const endpoint = data.id ? `gestor/Persona/${data.id}/` : 'gestor/Persona/'

    const method = data.id ? 'PUT' : 'POST'

    const res = await fetchCore(endpoint, {
      method,
      body: JSON.stringify(data),
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 && data.id) {
      toast.success('Persona actualizada')
      handleCancel()
    } else if (res.status === 201 && !data.id) {
      toast.success('Persona agregada')
      handleCancel()
    } else {
      toast.error(
        'Error al ' + (data.id ? 'actualizar' : 'agregar') + ' la persona'
      )
    }

    setLoading(false)
  }

  const handleCancel = () => {
    router.push('/admin/personas')
    router.refresh()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col gap-8 relative"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <PersonalData />
          <StatusData />
          <DocumentData />
          <LocationData />
          <ContactData />
          <footer className="flex items-center gap-3 justify-end sticky bottom-0 right-0 left-0 z-20 bg-white py-3 border-t">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isLoading={loading}
              isDisabled={loading || !isDirty}
            >
              {defauldata?.id ? 'Actualizar' : 'Guardar'}
            </Button>

            <Button
              radius="sm"
              type="reset"
              onPress={handleCancel}
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Confirmación"
        message="¿Estás seguro de guardar los datos?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
