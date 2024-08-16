import { IModality } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IModality>()

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
            placeholder="Nombre de la modalidad"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.nombre !== undefined}
            errorMessage={errors.nombre?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="descripcion"
        rules={{
          required: 'Ingrese una descripción',
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            aria-label="descripcion"
            label="Descripción"
            placeholder="Ingrese una descripción"
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
