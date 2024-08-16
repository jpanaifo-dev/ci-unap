'use client'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { IGroup } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

const optionGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const InfoData = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<IGroup>()

  return (
    <>
      <div className="w-full flex gap-4 items-center">
        <Controller
          control={control}
          name="grupo"
          rules={{
            required: 'Seleccione un grupo',
          }}
          render={({ field: { value, onChange } }) => (
            <Select
              aria-label="Grupo"
              radius="sm"
              variant="bordered"
              placeholder="Seleccione un grupo"
              label="Grupo"
              labelPlacement="outside"
              description="Grupo al que pertenece el modulo"
              selectedKeys={String([value]) ?? ['']}
              onChange={onChange}
              isInvalid={errors.grupo !== undefined}
              errorMessage={errors.grupo?.message as string}
            >
              {optionGroup.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="aforo"
          rules={{
            required: 'Ingrese un nombre',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Ingrese un aforo válido',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="Aforo"
              label="Aforo"
              placeholder="Ejemplo: 10"
              labelPlacement="outside"
              radius="sm"
              variant="bordered"
              value={value ? String(value) : ''}
              onValueChange={onChange}
              isInvalid={errors.aforo !== undefined}
              errorMessage={errors.aforo?.message as string}
              description="Cantidad de personas que pueden inscribirse en el grupo"
              type="number"
              min={0}
            />
          )}
        />
      </div>
      <section className="flex items-center gap-4">
        <Controller
          control={control}
          name="fecha_inicio"
          rules={{
            required: 'Seleccione una fecha de inicio',
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="date start"
              label="Fecha de inicio"
              labelPlacement="outside"
              value={value}
              onValueChange={onChange}
              radius="sm"
              variant="bordered"
              type="date"
            />
          )}
        />
        <Controller
          control={control}
          name="fecha_final"
          rules={{
            required: 'Seleccione una fecha de fin',
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="Date end"
              label="Fecha de inicio"
              labelPlacement="outside"
              value={value}
              onValueChange={onChange}
              radius="sm"
              variant="bordered"
              type="date"
            />
          )}
        />
      </section>
      <Controller
        control={control}
        name="resolucion"
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Resolución"
            label="Resolución"
            placeholder="Ejemplo: 1234"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value ? String(value) : ''}
            onValueChange={onChange}
            isInvalid={errors.resolucion !== undefined}
            errorMessage={errors.resolucion?.message as string}
          />
        )}
      />
    </>
  )
}
