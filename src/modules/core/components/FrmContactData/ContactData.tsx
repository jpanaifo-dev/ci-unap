'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@nextui-org/react'
import { IPerson } from '@/types'

export const ContactData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Controller
          control={control}
          name="celular"
          rules={{
            required: 'Este campo es requerido',
            pattern: {
              value: /^[0-9]{9}$/,
              message: 'Ingresa un número de celular válido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Celular"
              label="Celular"
              placeholder="Celular"
              labelPlacement="outside"
              radius="sm"
              value={value || ''}
              onChange={onChange}
              isInvalid={errors?.celular !== undefined}
              errorMessage={errors.celular?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="correo"
          rules={{
            required: 'Este campo es requerido',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Ingresa un correo válido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Correo"
              label="Correo"
              placeholder="Correo"
              labelPlacement="outside"
              radius="sm"
              value={value || ''}
              onChange={onChange}
              isInvalid={errors?.correo !== undefined}
              errorMessage={errors.correo?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="direccion"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Dirección"
              label="Dirección"
              placeholder="Dirección"
              labelPlacement="outside"
              radius="sm"
              value={value || ''}
              onChange={onChange}
              isInvalid={errors?.direccion !== undefined}
              errorMessage={errors.direccion?.message}
            />
          )}
        />
      </div>
    </>
  )
}
