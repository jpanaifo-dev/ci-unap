'use client'
import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const PersonalData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()
  return (
    <>
      <Controller
        name="nombres"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Nombres"
            label="Nombres"
            labelPlacement="outside"
            placeholder="Ejemplo: Juan"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.nombres ? true : false}
            errorMessage={errors.nombres?.message as string}
          />
        )}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Controller
          name="apellido_paterno"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Apellido Paterno"
              label="Apellido Paterno"
              labelPlacement="outside"
              placeholder="Ejemplo: Gómez"
              radius="sm"
              variant="bordered"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.apellido_paterno ? true : false}
              errorMessage={errors.apellido_paterno?.message as string}
            />
          )}
        />
        <Controller
          name="apellido_materno"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Apellido Materno"
              label="Apellido Materno"
              labelPlacement="outside"
              placeholder="Ejemplo: Pérez"
              radius="sm"
              variant="bordered"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.apellido_materno ? true : false}
              errorMessage={errors.apellido_materno?.message as string}
            />
          )}
        />
      </div>
    </>
  )
}
