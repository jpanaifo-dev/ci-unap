'use client'
import { IEnrollment } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IEnrollment>()

  return (
    <>
      <Controller
        control={control}
        name="fecha"
        rules={{
          required: 'Ingrese la fecha de la matricula',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Date"
            label="Fecha"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onChange={onChange}
            type="date"
            description="Fecha de la matricula"
            isInvalid={errors.fecha !== undefined}
            errorMessage={errors.fecha?.message as string}
          />
        )}
      />
    </>
  )
}
