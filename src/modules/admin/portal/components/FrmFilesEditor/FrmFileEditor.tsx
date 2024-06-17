'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { IPortalFile } from '@/types'
import { ActionsData, FileData, InfoData, LevelData } from './sections'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { HeaderSection } from '@/modules/admin/core'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd + 'api/' : urlLocal
interface IProps {
  data?: IPortalFile
}

export const FrmFileEditor = (props: IProps) => {
  const { data: defaulData } = props
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPortalFile>({
    defaultValues: defaulData,
  })
  const router = useRouter()

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPortalFile> = async (
    data: IPortalFile
  ) => {
    setIsOpen(false)
    setLoading(true)

    const { uploadArchivo, ...rest } = data
    const newData = {
      ...rest,
      archivo: uploadArchivo?.[0] || [],
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
    if (data.id) {
      const res = await fetch(`${urlBase}portal/File/${data.id}/`, {
        method: 'PUT',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        next: {
          tags: ['archivos'],
        },
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success(`Archivo ${data.nombre} actualizado`)
        handleExit()
      } else {
        toast.error('Error al actualizar el archivo')
      }
    } else {
      const res = await fetch(`${urlBase}portal/File/`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        next: {
          tags: ['archivos'],
        },
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Archivo creado correctamente')
        handleExit()
      } else {
        toast.error('Error al agregar el archivo')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.reset()
    router.refresh()
    router.push('/admin/portal/archivos')
  }

  const title = defaulData?.id ? 'Editar archivo' : 'Añadir nuevo archivo'
  const subtitle = defaulData?.id
    ? 'Editar los datos del archivo'
    : 'Agrega los datos del archivo'

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            <div className="w-full">
              <HeaderSection
                title={title}
                subtitle={subtitle}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-6"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData />
                <FileData />
                <LevelData />
                {defaulData?.id && <ActionsData />}
                <footer className="flex items-center gap-3 justify-end">
                  <Button
                    className="button-dark"
                    radius="sm"
                    type="submit"
                    isDisabled={loading}
                    isLoading={loading}
                  >
                    {defaulData?.id ? 'Actualizar' : 'Crear'}
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
        setOpen={setIsOpen}
        title="Confirmación"
        message="¿Está seguro de realizar esta acción?"
        onPress={() => handleFormSubmit(methods.getValues())}
      />
    </>
  )
}
