'use client'
import { LayoutFrmHorizontal } from '@/modules/admin/core'
import { IPerson } from '@/types'
import { DateInput, Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const LocationData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <LayoutFrmHorizontal
      title="Datos de ubicación"
      subtitle="Ingresa los datos de ubicación y nacimiento de la persona"
    >
      <section className="flex gap-6 items-center">
        <Controller
          name="fecha_nacimiento"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Fecha de nacimiento"
              label="Fecha de nacimiento"
              labelPlacement="outside"
              radius="sm"
              variant="bordered"
              type="date"
              value={value}
              onChange={onChange}
              isInvalid={errors.fecha_nacimiento ? true : false}
              errorMessage={errors.fecha_nacimiento?.message as string}
            />
          )}
        />
        <Controller
          name="lugar_nacimiento"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="site of birth"
              label="Lugar de nacimiento"
              labelPlacement="outside"
              placeholder="Ejemplo: Lima"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.lugar_nacimiento ? true : false}
              errorMessage={errors.lugar_nacimiento?.message as string}
            />
          )}
        />
      </section>
      <section className="flex gap-6 items-center">
        <Controller
          name="pais"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="country"
              label="País"
              labelPlacement="outside"
              placeholder="Ejemplo: Perú"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.pais ? true : false}
              errorMessage={errors.pais?.message as string}
            />
          )}
        />
        <Controller
          name="region"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="region"
              label="Región"
              labelPlacement="outside"
              placeholder="Ejemplo: Loreto"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.region ? true : false}
              errorMessage={errors.region?.message as string}
            />
          )}
        />
      </section>
      <section className="flex gap-6 items-center">
        <Controller
          name="provincia"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="province"
              label="Provincia"
              labelPlacement="outside"
              placeholder="Ejemplo: Maynas"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.provincia ? true : false}
              errorMessage={errors.provincia?.message as string}
            />
          )}
        />
        <Controller
          name="distrito"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="district"
              label="Distrito"
              labelPlacement="outside"
              placeholder="Ejemplo: Iquitos"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.distrito ? true : false}
              errorMessage={errors.distrito?.message as string}
            />
          )}
        />
      </section>
    </LayoutFrmHorizontal>
  )
}
