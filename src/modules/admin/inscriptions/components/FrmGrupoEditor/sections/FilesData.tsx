'use client'
import { IGroup } from '@/types'
import dynamic from 'next/dynamic'
import { registerPlugin } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
registerPlugin(FilePondPluginFileValidateType)
import 'filepond/dist/filepond.min.css'
import { Skeleton } from '@nextui-org/react'

const FilePond = dynamic(
  () => import('react-filepond').then((mod) => mod.FilePond),
  {
    ssr: false,
    loading: () => (
      <div>
        <Skeleton className="w-full h-20 rounded-lg" />
      </div>
    ),
  }
)

export const FilesData = () => {
  const { control } = useFormContext<IGroup>()

  return (
    <main className="w-full">
      <div>
        <label className="text-sm text-gray-600 pb-2">Adjunto Resolución</label>
        <Controller
          control={control}
          name="uploadAdjuntoResolucion"
          render={({ field: { value, onChange } }) => (
            <FilePond
              // ref={pond}
              files={value}
              labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
              acceptedFileTypes={['application/pdf']}
              allowMultiple={false}
              maxFiles={1}
              onupdatefiles={(fileItems) => {
                onChange(fileItems.map((fileItem) => fileItem.file))
              }}
            />
          )}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 pb-2">Sílabo</label>
        <Controller
          control={control}
          name="upLoadSilabo"
          render={({ field: { value, onChange } }) => (
            <FilePond
              files={value}
              labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
              acceptedFileTypes={['application/pdf']}
              allowMultiple={false}
              maxFiles={1}
              onupdatefiles={(fileItems) => {
                onChange(fileItems.map((fileItem) => fileItem.file))
              }}
            />
          )}
        />
      </div>
    </main>
  )
}
