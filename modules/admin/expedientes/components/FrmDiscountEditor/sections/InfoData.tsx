'use client'
import { IDiscount } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IDiscount>()
  return (
    <>
      <Controller
        control={control}
        name="descripcion"
        rules={{
          required: 'Ingrese un nombre',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="descripcion"
            label="Descripción del descuento"
            placeholder="Ejemplo: Descuento por pronto pago"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.descripcion !== undefined}
            errorMessage={errors.descripcion?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="porcentaje"
        rules={{
          required: 'Ingrese un nombre',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Ingrese un porcentaje válido',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="porcentaje"
            label="Porcentaje (%)"
            placeholder="Ejemplo: 10"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.porcentaje !== undefined}
            errorMessage={errors.porcentaje?.message as string}
            description="Ingrese un porcentaje válido"
          />
        )}
      />
    </>
  )
}
