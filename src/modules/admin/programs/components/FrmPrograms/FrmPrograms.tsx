'use client'
import { useState } from 'react'
import { ILanguages } from '@/types'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FileData, InfoData } from './sections'
import { DialogAction } from '@/components'

import { toast } from 'react-toastify'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal
const pathUrl = urlBase || ''

interface IProps {
  data?: ILanguages
}

export const FrmAddProgram = (props: IProps) => {
  const { data } = props
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = () => {
    setOpen(true)
  }

  const methods = useForm<ILanguages>({
    defaultValues: data,
  })

  const handleFormSubmit: SubmitHandler<ILanguages> = async (
    data: ILanguages
  ) => {
    setOpen(false)
    setLoading(true)

    const { upLoadImage, ...rest } = data
    const newData = {
      ...rest,
      image: upLoadImage?.[0] || [],
    }

    const formData = new FormData()
    if (upLoadImage && upLoadImage.length > 0) {
      formData.append('image', upLoadImage[0])
    }
    Object.keys(newData).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, (newData as Record<string, any>)[key])
      }
    })

    const endpoint = data.id
      ? `gestor/Programa/${data.id}/`
      : 'gestor/Programa/'
    const method = data.id ? 'PUT' : 'POST'

    const res = await fetch(`${pathUrl}${endpoint}`, {
      method: method,
      body: formData,
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 || res.status === 201) {
      const successMessage = data.id
        ? `Idioma ${data.nombre} actualizado`
        : 'Idioma agregado'
      toast.success(successMessage)
      console.log(successMessage)
      router.push('/admin/idiomas')
      methods.resetField
      router.refresh()
    } else {
      const errorMessage = data.id
        ? 'Error al actualizar el idioma'
        : 'Error al agregar el idioma'
      toast.error(errorMessage)
      console.log(errorMessage)
    }

    setLoading(false)
  }

  const handleCancel = () => {
    methods.reset()
    router.push('/admin/idiomas')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="max-w-xl flex flex-col gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InfoData />
          <FileData />
          <footer className="flex items-center gap-3 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isDisabled={loading}
              isLoading={loading}
            >
              Guardar
            </Button>

            <Button
              radius="sm"
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
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
