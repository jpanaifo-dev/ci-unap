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
          className="w-full flex flex-col gap-7 max-w-4xl sm:px-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <section className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-semibold">Datos personales</h2>
            <Divider />
            <PersonalData />
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-semibold">
              Estado de la persona
            </h2>
            <Divider />
            <StatusData />
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-semibold">
              Documentos de la persona
            </h2>
            <Divider />
            <DocumentData />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-semibold">
              Ubicación de la persona
            </h2>
            <LocationData />
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-gray-500 font-semibold">Datos de contacto</h2>
            <Divider />
            <ContactData />
          </section>

          <footer className="flex items-center gap-3 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
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
