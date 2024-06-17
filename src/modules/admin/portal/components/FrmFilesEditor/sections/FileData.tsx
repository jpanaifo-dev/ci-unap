'use client'
import { IPortalFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { useRef } from 'react'
import { Link } from '@nextui-org/react'
registerPlugin(FilePondPluginFileValidateType)

export const FileData = () => {
  const { control, watch } = useFormContext<IPortalFile>()
  const pond = useRef<FilePond>(null)

  return (
    <>
      {watch('archivo') !== undefined && (
        <section>
          <Link
            href={'' + watch('archivo')}
            showAnchorIcon
            target="_blank"
          >
            Ver imagen actual
          </Link>
        </section>
      )}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="archivo"
          className=""
        >
          Subir archivo
        </label>
        <Controller
          control={control}
          name="uploadArchivo"
          render={({ field: { value, onChange } }) => (
            <FilePond
              ref={pond}
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
      </div>
    </>
  )
}
