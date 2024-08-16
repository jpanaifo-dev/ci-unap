'use client'
import { IPublicationList } from '@/types'
import { Controller, useFormContext } from 'react-hook-form'
import { Skeleton } from '@nextui-org/react'
import dynamic from 'next/dynamic'

//For the text field
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div>
      <Skeleton className="w-full h-52 rounded-lg" />
    </div>
  ),
})
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const ContentData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublicationList>()

  return (
    <>
      {/* Your content goes here */}
      <section className="pb-14">
        {/* the className is used to define css variables necessary for the editor */}
        <Controller
          control={control}
          name="contenido"
          rules={{
            required: 'Ingrese el contenido de la publicación',
          }}
          render={({ field: { value, onChange } }) => (
            <ReactQuill
              value={value}
              onChange={onChange}
              theme="snow"
              className="h-52 rounded-lg"
            />
          )}
        />
        <label
          htmlFor="contenido"
          className="text-sm"
        >
          {errors.contenido !== undefined && (
            <span className="text-danger-500 ml-1">
              {errors.contenido.message}
            </span>
          )}
        </label>
      </section>
    </>
  )
}
