'use client'
import { ILanguages } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { useRef } from 'react'
import { Link } from '@nextui-org/react'
registerPlugin(FilePondPluginFileValidateType)

export const FileData = () => {
  const { control, watch } = useFormContext<ILanguages>()
  const pond = useRef<FilePond>(null)

  const pathImg = watch('image')

  return (
    <>
      {watch('image') !== undefined && (
        <section>
          <Link
            href={pathImg ?? ''}
            showAnchorIcon
            target="_blank"
          >
            Ver imagen actual
          </Link>
        </section>
      )}
      <Controller
        control={control}
        name="upLoadImage"
        render={({ field: { value, onChange } }) => (
          <FilePond
            ref={pond}
            files={value}
            labelIdle='Arrastra y suelta tu archivo PDF aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
            acceptedFileTypes={['image/*']}
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
