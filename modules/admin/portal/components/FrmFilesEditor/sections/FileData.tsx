'use client'
import { IPortalFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'

//Test filepond
import { registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { Skeleton } from '@nextui-org/react'
registerPlugin(FilePondPluginFileValidateType)

const FilePond = dynamic(
  () => import('react-filepond').then((mod) => mod.FilePond),
  {
    ssr: false,
    loading: () => (
      <div>
        <Skeleton className="w-full h-24 rounded-md" />
      </div>
    ),
  }
)

export const FileData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPortalFile>()

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="archivo"
        className=""
      >
        Subir archivo
      </label>
      <Controller
        control={control}
        // rules={{
        //   required: 'Seleccione un archivo',
        // }}
        name="archivo"
        render={({ field: { value, onChange } }) => (
          <FilePond
            files={value}
            labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
            acceptedFileTypes={['application/*']}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file))
            }}
          />
        )}
      />
      {errors.archivo && (
        <span className="text-danger-500 text-sm">
          {errors.archivo.message}
        </span>
      )}
    </div>
  )
}
