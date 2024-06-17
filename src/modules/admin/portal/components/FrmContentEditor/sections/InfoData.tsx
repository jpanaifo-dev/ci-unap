import { IPublication } from '@/types'
import { Textarea } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublication>()

  return (
    <>
      <Controller
        control={control}
        name="titulo"
        rules={{
          required: 'Ingrese el título de la publicación',
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            label="Título"
            placeholder="Escriba un título para la publicación"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.titulo !== undefined}
            errorMessage={errors.titulo?.message as string}
          />
        )}
      />
    </>
  )
}
