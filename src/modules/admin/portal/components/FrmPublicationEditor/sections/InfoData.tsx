import { IPublicationFile } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublicationFile>()

  return (
    <>
      <Controller
        control={control}
        name="descripcion"
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            aria-label="Contenido"
            label="Título o descripción"
            placeholder="Escriba una descripción de la publicación"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            description="Ingrese el contenido de la publicación o un título descriptivo"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.descripcion !== undefined}
            errorMessage={errors.descripcion?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="link"
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="link"
            label="Link de la publicación"
            placeholder="Ingrese el link de la publicación"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            description="Opccional: Ingrese el link de la publicación"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.link !== undefined}
            errorMessage={errors.link?.message as string}
          />
        )}
      />
    </>
  )
}
