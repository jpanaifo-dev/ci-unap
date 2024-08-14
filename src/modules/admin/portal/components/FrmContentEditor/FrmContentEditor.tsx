'use client'
import { useState } from 'react'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/admin'
import { IPublicationFileList, IPublicationType } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import {
  InfoData,
  ActionData,
  PublicationTypeData,
  ContentData,
  FileData,
} from './sections'

//To alert
import { toast } from 'react-toastify'
const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

interface IProps {
  dataDeafult?: IPublicationFileList
}

export const FrmContentEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPublicationFileList>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublicationFileList> = async (
    data: IPublicationFileList
  ) => {
    setLoading(true)
    setOpen(false)

    const endpoint = data.id
      ? `${urlBase}portal/PublicacionFile/${data.id}/`
      : `${urlBase}portal/PublicacionFile/`

    const { tipo, uploadArchivo, publicacion, ...rest } = data
    const newData = {
      ...rest,
      tipo: tipo.id,
      publicacion: publicacion.id,
      is_portada: data.is_portada || false,
      is_active: data.is_active || false,
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

    try {
      const res = await fetch(endpoint, {
        method: data.id ? 'PUT' : 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (res.ok) {
        const data = await res.json()
        const message = data.id ? 'actualizado' : 'creado'
        toast.success(`Contenido de la publicación ${message} correctamente.`)
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
  }

  //For title
  const title = dataDeafult
    ? 'Editar archivo multimedia'
    : 'Nuevo archivo multimedia'

  const subtitle = dataDeafult
    ? 'Modifica el archivo multimedia de la publicación'
    : 'Añade un archivo multimedia a la publicación'

  const handleExit = () => {
    router.refresh()
    methods.setValue('tipo', {} as IPublicationType)
    methods.setValue('is_active', false)
    router.push('/admin/portal/contenidos')
  }

  return (
    <main className="flex flex-col gap-1 items-center">
      <section className="w-full max-w-5xl section-panel flex flex-col gap-4">
        <FormProvider {...methods}>
          <main className="w-full">
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
              title="Archivo multimedia"
              subtitle="Sube un archivo multimedia para la publicación"
            >
              <FileData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Publicación"
              subtitle="Seleccione laz publicación  a la que añadirá este archivo multimedia"
            >
              <ContentData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Información del archivo"
              subtitle="Agrega una descripción y selecciona el archivo multimedia"
            >
              <InfoData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Tipo de archivo multimedia"
              subtitle="Selecciona el tipo de archivo multimedia. Ejemplo: Foto, video, audio, etc."
            >
              <PublicationTypeData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Configuración de privacidad y visibilidad"
              subtitle="Establece la privacidad del archivo multimedia, este archivo será visible en la publicación"
            >
              <ActionData />
            </LayoutFrmHorizontal>
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
      </section>
      <DialogAction
        isOpen={isOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        setOpen={setOpen}
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </main>
  )
}
