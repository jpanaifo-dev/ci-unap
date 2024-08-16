'use client'
import React, { useRef, useState } from 'react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import {
  Controller,
  SubmitHandler,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { IGroup } from '@/types'

import { toast } from 'react-toastify'
import { Link } from '@nextui-org/react'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
registerPlugin(FilePondPluginFileValidateType)

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal
const pathUrl = urlBase || ''

interface IProps {
  defaulData?: IGroup
}

export const FrmUploadSilabo = (props: IProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { defaulData } = props

  const handleExit = () => {
    router.back()
  }

  const methods = useForm<IGroup>({
    defaultValues: defaulData,
  })

  const onSubmit: SubmitHandler<IGroup> = async (data) => {
    setLoading(true)
    const { upLoadSilabo, docente, modulo, uploadAdjuntoResolucion, ...rest } =
      data

    if (defaulData && upLoadSilabo) {
      const newData = {
        ...rest,
        docente: docente?.id,
        modulo: modulo?.id,
        silabo: upLoadSilabo?.[0],
        adjunto_resolucion: uploadAdjuntoResolucion?.[0] || [],
      }

      try {
        const formData = new FormData()
        // Adjunta el archivo al FormData
        formData.append('silabo', upLoadSilabo[0])
        // Adjunta los otros campos de datos al FormData
        Object.keys(newData).forEach((key) => {
          if (key !== 'silabo') {
            formData.append(key, (newData as Record<string, any>)[key])
          }
        })

        const response = await fetch(
          `${urlBase}gestor/Grupo/${defaulData?.id}/`,
          {
            method: 'PUT',
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          }
        )

        if (response.ok) {
          toast.success('Sílabo subido correctamente')
          methods.setValue('upLoadSilabo', [])
          await new Promise((resolve) => setTimeout(resolve, 1000))
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        } else {
          toast.error('Error al subir el sílabo')
        }
      } catch (error) {
        toast.error('Error al subir el sílabo')
      }
    }
    setLoading(false)
  }

  const pond = useRef<FilePond>(null)

  return (
    <>
      <main className="flex flex-col gap-5 items-center w-full">
        {defaulData?.silabo && (
          <section className="w-full max-w-2xl">
            <h1 className="text-gray-500">
              Archivo actual: {defaulData?.silabo?.split('/').pop()}
            </h1>
            <Link
              href={pathUrl.slice(0, -1) + defaulData?.silabo}
              target="_blank"
              showAnchorIcon
            >
              Descargar archivo
            </Link>
          </section>
        )}
        <FormProvider {...methods}>
          <form
            className="w-full p-4 border rounded-lg max-w-2xl flex flex-col gap-5"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray-500 ">
                Subir sílabo del curso
              </h2>
              <h2 className="text-gray-500 text-xs">
                Debe subir el archivo en formato PDF. El archivo no debe pesar
                más de 10MB.
              </h2>
            </div>
            <section>
              <Controller
                control={methods.control}
                name="upLoadSilabo"
                rules={{
                  //Solo se permiten archivos PDF
                  validate: (value) => {
                    if (value) {
                      const file = value[0]
                      const type = file?.type
                      if (type !== 'application/pdf') {
                        return 'Solo se permiten archivos PDF'
                      }
                      if (file.size > 10000000) {
                        return 'El archivo no debe pesar más de 10MB'
                      }
                    }
                    return true
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <FilePond
                    labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
                    ref={pond}
                    files={value}
                    acceptedFileTypes={['application/pdf']}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={(fileItems) => {
                      onChange(fileItems.map((fileItem) => fileItem.file))
                    }}
                  />
                )}
              />
              <label
                htmlFor="upLoadSilabo"
                className="text-red-500 text-xs"
              >
                {methods.formState.errors.upLoadSilabo?.message}
              </label>
            </section>
            <footer className="flex justify-end gap-2">
              <Button
                size="sm"
                className="button-dark"
                type="submit"
                isDisabled={loading}
                isLoading={loading}
              >
                Subir archivo
              </Button>
              <Button
                size="sm"
                onPress={handleExit}
              >
                Cancelar
              </Button>
            </footer>
          </form>
        </FormProvider>
      </main>
    </>
  )
}
