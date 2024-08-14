'use client'
import { IModule } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IModule>()
  return (
    <>
      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'Ingrese un nombre',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="nombre"
            label="Nombre"
            placeholder="Nombre del módulo"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.nombre !== undefined}
            errorMessage={errors.nombre?.message as string}
          />
        )}
      />
    </>
  )
}
