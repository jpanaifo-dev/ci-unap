'use client'
import { useState } from 'react'
import { DialogAction } from '@/components'
import { IPublicationFileList, IPublicationList } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  ActionData,
  PFileTypeData,
  FileData,
  InfoData,
  TabSection,
} from './sections'
import { HeaderSection } from '@/modules/admin'
import { useFilterFromUrl } from '@/hooks'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

interface IProps {
  publication?: IPublicationList
}

export const FrmContentForPublication = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { publication } = props

  const router = useRouter()
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', 'preview')

  const methods = useForm<IPublicationFileList>({
    defaultValues: {
      publicacion: publication,
      is_active: true,
      is_portada: false,
    },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublicationFileList> = async (
    data: IPublicationFileList
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

    const endpoint = data.id
      ? `${urlBase}portal/PublicacionFile/${data.id}/`
      : `${urlBase}portal/PublicacionFile/`

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

  const handleExit = () => {
    router.push(`/admin/portal/publicaciones/${publication?.id}/contenido`)
    methods.reset()
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="grid grid-cols-1 lg:grid-cols-2 py-3 gap-4">
          <section className="section-panel">
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div>
                <Button
                  as={Link}
                  variant="light"
                  color="primary"
                  href={`/admin/portal/publicaciones/`}
                  startContent={<IconArrowNarrowLeft stroke={1} />}
                  size="sm"
                >
                  Atrás
                </Button>
              </div>
              <HeaderSection
                title="Archivo multimedia de la publicación"
                subtitle="Añade un archivo multimedia a la publicación"
              />
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
                  {methods.formState.isDirty ? 'Guardar cambios' : 'Guardar'}
                </Button>

                <Button
                  radius="sm"
                  onPress={handleExit}
                >
                  Cancelar
                </Button>
              </footer>
            </form>
          </section>
          <section>
            <TabSection data={publication} />
          </section>
        </main>
      </FormProvider>

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
