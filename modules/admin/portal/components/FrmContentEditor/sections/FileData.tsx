'use client'
import { IPublicationFileList } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { useRef } from 'react'
import { Link } from '@nextui-org/react'
registerPlugin(FilePondPluginFileValidateType)

export const FileData = () => {
  const { control, watch } = useFormContext<IPublicationFileList>()
  const pond = useRef<FilePond>(null)

  const pathImg = watch('archivo')

  return (
    <>
      {watch('archivo') !== undefined && (
        <section>
          <Link
            href={pathImg ?? ''}
            showAnchorIcon
            target="_blank"
          >
            Ver archivo adjunto
          </Link>
        </section>
      )}
      <Controller
        control={control}
        name="uploadArchivo"
        render={({ field: { value, onChange } }) => (
          <FilePond
            ref={pond}
            files={value}
            labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
            acceptedFileTypes={['image/*', 'application/pdf']}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file))
            }}
          />
        )}
      />
    </>
  )
}
