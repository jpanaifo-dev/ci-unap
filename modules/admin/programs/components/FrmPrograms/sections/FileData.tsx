'use client'
import { ILanguages } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'
//Test filepond
import { registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { Link, Skeleton } from '@nextui-org/react'
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
  const { control, watch } = useFormContext<ILanguages>()

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
            files={value}
            labelIdle='Arrastra y suelta tu archivo aquí o <span class="filepond--label-action">Selecciona un archivo</span>'
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
