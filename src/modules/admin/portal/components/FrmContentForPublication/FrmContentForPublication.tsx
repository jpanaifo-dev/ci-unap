'use client'
import { useState } from 'react'
import { DialogAction } from '@/components'
import { IPublication, IPublicationFile, IResApi } from '@/types'
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ActionData, PFileTypeData, FileData, InfoData } from './sections'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

interface IProps {
  publication?: IPublication
  publicationFiles?: IResApi<IPublicationFile>
}

const renderContent = (content: string) => {
  return (
    <div
      className="custom-quill"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export const FrmContentForPublication = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { publication, publicationFiles } = props
  const {
    titulo: title_Publication,
    contenido,
    fecha: date_Publication,
    tipo,
  } = publication || {}
  const router = useRouter()

  const methods = useForm<IPublicationFile>({
    defaultValues: {
      publicacion: publication,
      is_active: true,
      is_portada: false,
    },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublicationFile> = async (
    data: IPublicationFile
  ) => {
    setLoading(true)
    setOpen(false)

    const { tipo_id, uploadArchivo, publicacion, ...rest } = data
    const newData = {
      ...rest,
      archivo: uploadArchivo?.[0] || [],
      publicacion: publicacion.id,
      tipo: tipo_id,
    }

    const formData = new FormData()
    // Adjunta el archivo al FormData
    if (uploadArchivo && uploadArchivo.length > 0) {
      formData.append('archivo', uploadArchivo[0])
    }
    // Adjunta los otros campos de datos al FormData
    Object.keys(newData).forEach((key) => {
      if (key !== 'archivo') {
        formData.append(key, (newData as Record<string, any>)[key])
      }
    })

    const endpoint = `${urlBase}portal/PublicacionFile/`

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        toast.success('Contenido de la publicación guardado correctamente')
        handleExit()
      } else {
        const errorData: Record<string, string[]> = await res.json()
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join(' | ')
        console.error('Error:', errorMessage)
        toast.error(
          `Error al guardar el contenido de la publicación: ${errorMessage}`
        )
      }
    } catch (err: any | unknown) {
      console.error('Error de red o inesperado:', err.message)
      toast.error('Ocurrió un error inesperado.')
    } finally {
      setLoading(false)
    }

    setLoading(false)
  }

  const handleExit = () => {
    router.push('/admin/portal/publicaciones/')
  }

  return (
    <>
      <Modal
        isOpen
        size="5xl"
        radius="sm"
        onClose={handleExit}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <h1 className="font-bold text-xl">
              Vista previa de la publicación
            </h1>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <main className="grid grid-cols-1 lg:grid-cols-2 py-3 gap-4">
              <section className="flex flex-col gap-3">
                <header>
                  <Chip
                    radius="sm"
                    size="sm"
                    variant="faded"
                    color="warning"
                  >
                    {tipo?.nombre}
                  </Chip>
                  <h1 className="font-bold text-3xl">{title_Publication}</h1>
                </header>
                <article>
                  <h1 className="font-medium">Fecha de publicación</h1>
                  <p className="text-gray-500text-sm">{date_Publication}</p>
                </article>
                <section>{renderContent(contenido || '')}</section>
              </section>
              <section>
                <FormProvider {...methods}>
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <FileData />
                    <InfoData />
                    <PFileTypeData />
                    <ActionData />
                    <footer className="flex items-center gap-3 justify-end">
                      <Button
                        className="button-dark"
                        radius="sm"
                        isLoading={loading}
                        isDisabled={loading}
                        type="submit"
                      >
                        Añadir archivo
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
