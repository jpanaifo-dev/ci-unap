'use client'
import { IPortalFile } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPortalFile>()

  return (
    <>
      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'Ingrese el nombre del archivo',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="name file"
            label="Nombre del archivo"
            labelPlacement="outside"
            placeholder="Escriba el nombre del archivo"
            radius="sm"
            variant="bordered"
            value={value}
            onChange={onChange}
            isInvalid={errors.tipo !== undefined}
            errorMessage={errors.tipo?.message as string}
          />
        )}
      />
    </>
  )
}
