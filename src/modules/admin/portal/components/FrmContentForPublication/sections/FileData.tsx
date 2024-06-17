'use client'
import { IPublicationFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { useRef } from 'react'
registerPlugin(FilePondPluginFileValidateType)

export const FileData = () => {
  const { control } = useFormContext<IPublicationFile>()
  const pond = useRef<FilePond>(null)

  return (
    <section>
      <label htmlFor="uploadArchivo">Agrergar archivo</label>
      <Controller
        control={control}
        name="uploadArchivo"
        render={({ field: { value, onChange } }) => (
          <FilePond
            ref={pond}
            files={value}
            labelIdle='Arrastra y suelta tu archivo PDF o JPEG o Webp aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
            acceptedFileTypes={['image/*  ', 'application/pdf', 'webp']} // 'image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file))
            }}
          />
        )}
      />
    </section>
  )
}
