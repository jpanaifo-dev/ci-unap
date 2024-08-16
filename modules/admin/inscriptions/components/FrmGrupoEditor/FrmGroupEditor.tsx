'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import { HeaderSection, LayoutFrmHorizontal } from '@/modules/admin'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IGroup } from '@/types'
import { DialogAction } from '@/components'

//To alert
import { toast } from 'react-toastify'
import {
  ActionData,
  FilesData,
  InfoData,
  ModuleData,
  TeacherData,
} from './sections'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

interface IProps {
  defaulData?: IGroup
}

export const FrmGroupEditor = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IGroup>({
    defaultValues: {
      ...defaulData,
      docente: {
        ...defaulData?.docente,
        full_name: defaulData
          ? defaulData?.docente?.persona?.nombres +
            ' ' +
            defaulData?.docente?.persona?.apellido_paterno +
            ' ' +
            defaulData?.docente?.persona?.apellido_materno
          : '',
      },
    },
  })

  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IGroup> = async (data: IGroup) => {
    setOpen(false)
    setLoading(true)

    const { upLoadSilabo, docente, modulo, uploadAdjuntoResolucion, ...rest } =
      data

    const newData = {
      ...rest,
      docente: docente?.id,
      modulo: modulo?.id,
      silabo: upLoadSilabo?.[0] || [],
      adjunto_resolucion: uploadAdjuntoResolucion?.[0] || [],
    }

    const formData = new FormData()

    // Adjunta el archivo al FormData
    if (upLoadSilabo && upLoadSilabo.length > 0) {
      formData.append('silabo', upLoadSilabo[0])
    }

    if (uploadAdjuntoResolucion && uploadAdjuntoResolucion.length > 0) {
      formData.append('adjunto_resolucion', uploadAdjuntoResolucion[0])
    }

    // Adjunta los otros campos de datos al FormData
    Object.keys(newData).forEach((key) => {
      if (key !== 'silabo' && key !== 'adjunto_resolucion') {
        formData.append(key, (newData as Record<string, any>)[key])
      }
    })

    if (data.id) {
      const res = await fetch(`${urlBase}gestor/Grupo/${data.id}/`, {
        method: 'PUT',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Grupo atualizado')
        handleExit()
      } else {
        toast.error('Error al actualizar el grupo')
      }
    } else {
      const res = await fetch(`${urlBase}gestor/Grupo/`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Descuento creado correctamente')
        handleExit()
      } else {
        toast.error('Error al actualizar el grupo')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.reset()
    router.push('/admin/cursos/grupos')
  }

  const title = defaulData?.id ? 'Editar el grupo' : 'Crear un nuevo grupo'
  const subtitle = defaulData?.id
    ? 'Editar detalles de grupo'
    : 'Ingresa los datos del grupo'

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="w-full section-panel max-w-6xl flex flex-col gap-6">
        <HeaderSection
          title={title}
          subtitle={subtitle}
        />
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4 items-center w-full "
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <LayoutFrmHorizontal
              title="Datos generales"
              subtitle="Ingresa los datos del grupo, aforo, fecha de inicio y fin"
            >
              <InfoData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Archivos"
              subtitle="Adjunta el silabo y la resolución"
            >
              <FilesData />
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Otros datos"
              subtitle="Selecciona el módulo y el docente"
            >
              <section className="flex flex-col gap-4">
                <ModuleData />
                <TeacherData />
              </section>
            </LayoutFrmHorizontal>
            <LayoutFrmHorizontal
              title="Configuración de privacidad"
              subtitle="Activa o desactiva el grupo"
            >
              <ActionData />
            </LayoutFrmHorizontal>
            <footer className="w-full flex gap-2 justify-end pt-4">
              <Button
                className="button-dark"
                radius="sm"
                type="submit"
                isDisabled={loading || !isDirty}
                isLoading={loading}
              >
                {defaulData?.id ? 'Actualizar' : 'Guardar'}
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
        <DialogAction
          isOpen={isOpen}
          setOpen={setOpen}
          title="Confirmación"
          message="¿Estás seguro de guardar los cambios?"
          onPress={methods.handleSubmit(handleFormSubmit)}
        />
      </section>
    </main>
  )
}
