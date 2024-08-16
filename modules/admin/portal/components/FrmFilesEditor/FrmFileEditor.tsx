'use client'
import { useState } from 'react'
import { Button, Link } from '@nextui-org/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { IPortalFile, IPortalFileList } from '@/types'
import { FileData, InfoData, PreviewDoc, TipoData } from './sections'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { HeaderSection } from '@/modules/admin/core'
import { createOrUpdateFile } from '@/api'

interface IProps {
  data?: IPortalFileList
}

export const FrmFileEditor = (props: IProps) => {
  const { data: defaulData } = props
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPortalFile>({
    defaultValues: {
      id: defaulData?.id || undefined,
      nombre: defaulData?.nombre || '',
      archivo: [],
      tipo: defaulData?.tipo?.id ? String(defaulData.tipo.id) : '',
    },
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

    try {
      const res = await createOrUpdateFile(data)

      if (res.ok) {
        const data = await res.json()
        const message = data.id ? 'actualizado' : 'creado'
        toast.success(`Archivo ${message} correctamente.`)
        handleExit()
      } else {
        const errorData: Record<string, string[]> = await res.json()
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join(' | ')
        console.error('Error:', errorMessage)
        toast.error(`Error al guardar el archivo: ${errorMessage}`)
      }
    } catch (err: any | unknown) {
      console.error('Error:', err)
      toast.error('Error al guardar el archivo')
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
    <main className="grid grid-cols-1 gap-5 sm:grid-cols-2 h-full">
      <FormProvider {...methods}>
        <section className="flex flex-col gap-4 section-panel">
          <header className="w-full">
            <HeaderSection
              title={title}
              subtitle={subtitle}
            />
          </header>
          {defaulData?.archivo && (
            <section className="bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">
                  Archivo registrado actualmente
                </h2>
                <p className="text-xs text-gray-500">
                  Si desea cambiar el archivo, puede subir uno nuevo.
                </p>
              </div>
              <Link
                href={defaulData?.archivo}
                showAnchorIcon
                target="_blank"
              >
                Ver archivo
              </Link>
            </section>
          )}
          <form
            className="flex flex-col gap-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InfoData />
            <FileData />
            <TipoData />
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
        </section>
        <section className="h-full">
          <PreviewDoc pathFile={defaulData?.archivo} />
        </section>
        <DialogAction
          isOpen={isOpen}
          setOpen={setIsOpen}
          title="Confirmación"
          message="¿Está seguro de realizar esta acción?"
          onPress={() => handleFormSubmit(methods.getValues())}
        />
      </FormProvider>
    </main>
  )
}
