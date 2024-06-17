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
          <Input
            aria-label="Titulo"
            label="Título"
            placeholder="Escriba un título del archivo"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            description="Ingrese una descripción del archivo"
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
        rules={{
          required: 'Este campo es requerido',
          pattern: {
            value:
              /^((http|https):\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
            message: 'Ingrese un link válido',
          },
        }}
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
