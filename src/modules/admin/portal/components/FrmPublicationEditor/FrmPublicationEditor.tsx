'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/admin'
import { DialogAction } from '@/components'
import { IPublicationFile } from '@/types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  ActionData,
  ContentData,
  PFileTypeData,
  FileData,
  InfoData,
} from './sections'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  dataDeafult?: IPublicationFile
}

export const FrmPublicationEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPublicationFile>({
    defaultValues: {
      ...dataDeafult,
      tipo_id: String(dataDeafult?.tipo.id) || '',
      is_active: dataDeafult?.is_active || true,
      is_portada: dataDeafult?.is_portada || false,
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

    const archivoIsPdfOrWord =
      uploadArchivo?.[0]?.type.includes('pdf') ||
      uploadArchivo?.[0]?.type.includes('word') ||
      uploadArchivo?.[0]?.type.includes('officedocument') ||
      uploadArchivo?.[0]?.type.includes('application') ||
      uploadArchivo?.[0]?.type.includes('msword')

    const newData = {
      ...rest,
      archivo: uploadArchivo?.[0] || [],
      publicacion: publicacion.id,
      tipo: tipo_id,
      is_portada: archivoIsPdfOrWord ? false : data.is_portada,
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

    const successMessage = dataDeafult?.id
      ? 'Contenido de la publicación actualizado correctamente'
      : 'Contenido de la publicación guardado correctamente'
    const errorMessage = dataDeafult?.id
      ? 'Error al actualizar el contenido de la publicación'
      : 'Error al guardar el contenido de la publicación'

    const endpoint = dataDeafult?.id
      ? `${urlBase}portal/PublicacionFile/${data.id}/`
      : `${urlBase}portal/PublicacionFile/`
    const method = dataDeafult?.id ? 'PUT' : 'POST'

    const res = await fetch(endpoint, {
      method: method,
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 || res.status === 201) {
      toast.success(successMessage)
      handleExit()
    } else {
      toast.error(errorMessage)
      console.log(errorMessage)
    }

    setLoading(false)
  }

  //For title
  const title = dataDeafult ? 'Editar contenido' : 'Nuevo contenido'

  const subtitle = dataDeafult
    ? 'Modifica los datos del contenido'
    : 'Completa los datos del nuevo contenido'

  const handleExit = () => {
    router.push('/admin/portal/contenidos')
  }

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="4xl"
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
                <FileData />
                <PFileTypeData />
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
