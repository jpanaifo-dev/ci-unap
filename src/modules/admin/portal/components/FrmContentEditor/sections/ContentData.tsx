'use client'
import { IPublication } from '@/types'
import { Controller, useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'

//For the text field
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

// import ReactQuill from 'react-quill'

export const ContentData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublication>()

  return (
    <>
      {/* Your content goes here */}
      <section className="pb-14">
        <label
          htmlFor="contenido"
          className="text-sm pb-2"
        >
          Contenido
          {errors.contenido !== undefined && (
            <span className="text-danger-500 ml-1">
              {errors.contenido.message}
            </span>
          )}
        </label>
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
              className="h-52"
            />
          )}
        />
      </section>
    </>
  )
}
