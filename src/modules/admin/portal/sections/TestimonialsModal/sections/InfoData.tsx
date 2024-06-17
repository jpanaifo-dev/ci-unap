import { ITestimony } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ITestimony>()

  return (
    <>
      <Controller
        control={control}
        name="contenido"
        rules={{
          required: 'Ingrese el contenido del comentario',
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            aria-label="contenido"
            label="Contenido"
            placeholder="Contenido del comentario"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.contenido !== undefined}
            errorMessage={errors.contenido?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="valoracion"
        rules={{
          required: 'Ingrese la valoración del comentario',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            type='number'
            min={1}
            max={5}
            aria-label="valoracion"
            label="Valoración"
            placeholder="Valoración del comentario"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={String(value) || ''}
            onValueChange={(val) => onChange(Number(val))}
            isInvalid={errors.fecha !== undefined}
            errorMessage={errors.fecha?.message as string}
          />
        )}
        />
    </>
  )
}
