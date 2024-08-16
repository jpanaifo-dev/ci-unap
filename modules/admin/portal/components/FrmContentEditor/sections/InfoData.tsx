import { IPublicationFileList } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublicationFileList>()

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
            label="Link de referencia"
            placeholder="Ingrese el link de referencia"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            description="Opccional: Link de referencia del archivo de la publicación"
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
