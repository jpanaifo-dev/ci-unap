'use client'
import { IPublicationFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'

import { registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { Link, Skeleton } from '@nextui-org/react'

registerPlugin(FilePondPluginFileValidateType)

const FilePond = dynamic(
  () => import('react-filepond').then((mod) => mod.FilePond),
  {
    ssr: false,
    loading: () => (
      <div>
        <Skeleton className="w-full h-24 rounded-lg" />
      </div>
    ),
  }
)

export const FileData = () => {
  const { control, watch } = useFormContext<IPublicationFile>()

  const id = watch('id')
  const archivo = watch('archivo')

  return (
    <section>
      <label htmlFor="uploadArchivo">Agrergar archivo</label>
      <Controller
        control={control}
        name="uploadArchivo"
        render={({ field: { value, onChange } }) => (
          <FilePond
            files={value}
            labelIdle='Arrastra y suelta tu archivo PDF o JPEG o Webp aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
            acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/webp']}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file))
            }}
          />
        )}
      />
      {id && archivo !== null && (
        <div className="flex felx-col gap-1">
          <Link
            href={`https://idiomas.unapiquitos.edu.pe${archivo}`}
            target="_blank"
            showAnchorIcon
            size="sm"
          >
            Ver archivo actual
          </Link>
          <p className="text-xs font-medium">
            Si subes un nuevo archivo, el archivo actual será reemplazado.
          </p>
        </div>
      )}
    </section>
  )
}
