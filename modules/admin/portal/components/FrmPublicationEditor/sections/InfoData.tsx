import { IPublicationList } from '@/types'
import { Textarea } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublicationList>()

  return (
    <>
      <Controller
        control={control}
        name="titulo"
        rules={{
          required: 'Ingrese el título de la publicación',
          maxLength: {
            value: 150,
            message: 'El título debe tener máximo 150 caracteres',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            aria-label="titulo"
            placeholder="Escriba un título para la publicación"
            radius="sm"
            variant="bordered"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.titulo !== undefined}
            errorMessage={errors.titulo?.message as string}
          />
        )}
      />
    </>
  )
}
