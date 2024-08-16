'use client'
import { IPortalFile } from '@/types'
import { useFormContext } from 'react-hook-form'

interface IProps {
  pathFile?: string
}

export const PreviewDoc = (props: IProps) => {
  const { pathFile } = props
  const { watch } = useFormContext<IPortalFile>()
  const value = watch('archivo')
  const file = value ? value[0] : null

  const src = file ? URL.createObjectURL(file) : pathFile ? pathFile : ''

  return (
    <section className="w-full h-full">
      {file && (
        <iframe
          src={src}
          width="100%"
          className="h-screen max-h-[calc(100vh-4rem)]"
          title="file"
        ></iframe>
      )}
      {!file && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">No hay archivo seleccionado</p>
        </div>
      )}
    </section>
  )
}
