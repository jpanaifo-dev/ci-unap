'use client'
import { useState } from 'react'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/admin'
import { IPublicationList, IPublicationType } from '@/types'
import { Button } from '@nextui-org/react'
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
  dataDeafult?: IPublicationList
}

export const FrmPublicationEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPublicationList>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublicationList> = async (
    data: IPublicationList
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
      <main className="w-full flex flex-col items-center">
        <section className="w-full max-w-6xl section-panel-sticky">
          <FormProvider {...methods}>
            <main className="w-full pb-4">
              <HeaderSection
                title={title}
                subtitle={subtitle}
              />
            </main>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <LayoutFrmHorizontal
                title="Título de la publicación"
                subtitle="Ingresa el título de la publicación, Recuerda que no es más de 150 caracteres"
              >
                <InfoData />
              </LayoutFrmHorizontal>
              <LayoutFrmHorizontal
                title="Contenido de la publicación"
                subtitle="Crear el contenido de la publicación. Puedes darle formato al texto y agregar enlaces."
              >
                <ContentData />
              </LayoutFrmHorizontal>
              <LayoutFrmHorizontal
                title="Tipo de publicación"
                subtitle="Puedes seleccionar el tipo de publicación que deseas crear. Ejemplo: Noticia, Evento, etc."
              >
                <PublicationTypeData />
              </LayoutFrmHorizontal>
              <LayoutFrmHorizontal
                title="Configuración de privacidad"
                subtitle="Puedes seleccionar si la publicación será visible para los usuarios del portal y si será visible en el banner."
              >
                <ActionData />
              </LayoutFrmHorizontal>
              <footer className="flex items-center gap-3 justify-end sticky bottom-0 py-4 bg-white z-20 border-t-2">
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
        </section>
      </main>
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
