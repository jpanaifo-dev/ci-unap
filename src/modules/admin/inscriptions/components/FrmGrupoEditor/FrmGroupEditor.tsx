'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import { HeaderSection } from '@/modules/admin'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IGroup } from '@/types'
import { DialogAction } from '@/components'

//To alert
import { toast } from 'react-toastify'
import { FilesData, InfoData, ModuleData, TeacherData } from './sections'
import { parseDate } from '@internationalized/date'

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
      range: {
        // start: parseDate("2024-05-01"),
        // end: parseDate("2025-05-08"),
        start: defaulData?.fecha_inicio
          ? parseDate(defaulData?.fecha_inicio)
          : parseDate('2024-05-01'),
        end: defaulData?.fecha_final
          ? parseDate(defaulData?.fecha_final)
          : parseDate('2025-05-08'),
      },
    },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IGroup> = async (data: IGroup) => {
    setOpen(false)
    setLoading(true)

    const {
      range,
      upLoadSilabo,
      docente,
      modulo,
      uploadAdjuntoResolucion,
      ...rest
    } = data

    const newData = {
      ...rest,
      docente: docente?.id,
      modulo: modulo?.id,
      silabo: upLoadSilabo?.[0] || [],
      adjunto_resolucion: uploadAdjuntoResolucion?.[0] || [],
      fecha_inicio: range?.start,
      fecha_final: range?.end,
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
    <>
      <HeaderSection
        title={title}
        subtitle={subtitle}
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 items-center w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <section className="p-4 border flex flex-col gap-4 rounded-xl max-w-4xl w-full ">
            <header>
              <p>Datos generales</p>
            </header>
            <InfoData />
          </section>
          <section className="p-4 border flex flex-col gap-4 rounded-xl max-w-4xl w-full ">
            <header>
              <p>Archivos</p>
            </header>
            <FilesData />
          </section>
          <section className="p-4 border flex flex-col gap-4 rounded-xl max-w-4xl w-full ">
            <header>
              <p>Más datos</p>
            </header>
            <ModuleData />
            <TeacherData />
            {/* Is active section */}
          </section>
          <footer className="w-full p-4 max-w-4xl flex gap-2 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              size="lg"
              type="submit"
              isDisabled={loading}
              isLoading={loading}
            >
              {defaulData?.id ? 'Actualizar' : 'Guardar'}
            </Button>
            <Button
              radius="sm"
              size="lg"
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
    </>
  )
}
