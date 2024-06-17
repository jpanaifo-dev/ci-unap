'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/admin'
import { IPublication, IPublicationType } from '@/types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import {
  InfoData,
  ActionData,
  PublicationTypeData,
  ContentData,
} from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  dataDeafult?: IPublication
}

export const FrmContentEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPublication>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublication> = async (
    data: IPublication
  ) => {
    setLoading(true)
    setOpen(false)
    const endpoint = dataDeafult?.id
      ? `portal/Publicacion/${data.id}/`
      : 'portal/Publicacion/'
    const method = dataDeafult?.id ? 'PUT' : 'POST'

    const successMessage = dataDeafult?.id
      ? 'Publicación actualizada correctamente'
      : 'Publicación guardada correctamente'
    const errorMessage = dataDeafult?.id
      ? 'Error al actualizar la publicación'
      : 'Error al guardar la publicación'

    const newData = {
      ...data,
      tipo: data?.tipo?.id,
    }

    const res = await fetchCore(endpoint, {
      method: method,
      body: JSON.stringify(newData),
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 || res.status === 201) {
      toast.success(successMessage)
      handleExit()
    } else {
      toast.error(errorMessage)
    }

    setLoading(false)
  }

  //For title
  const title = dataDeafult ? 'Editar publicación' : 'Nueva publicación'

  const subtitle = dataDeafult
    ? 'Modifica los datos de la publicación'
    : 'Agrega una nueva publicación'

  const handleExit = () => {
    router.refresh()
    methods.setValue('tipo', {} as IPublicationType)
    methods.setValue('is_active', false)
    methods.setValue('is_banner', false)
    methods.setValue('contenido', '')
    router.push('/admin/portal/publicaciones')
  }

  return (
    <>
      <Modal
        isOpen
        size="4xl"
        radius="sm"
        onClose={handleExit}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <main className="w-full">
              <HeaderSection
                title={title}
                subtitle={subtitle}
              />
            </main>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <InfoData />
                <ContentData />
                <PublicationTypeData />
                <ActionData />
                <footer className="flex items-center gap-3 justify-end">
                  <Button
                    className="button-dark"
                    radius="sm"
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    {dataDeafult?.id ? 'Actualizar' : 'Guardar'}
                  </Button>

                  <Button
                    radius="sm"
                    onPress={handleExit}
                  >
                    Cancelar
                  </Button>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <DialogAction
        isOpen={isOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        setOpen={setOpen}
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
