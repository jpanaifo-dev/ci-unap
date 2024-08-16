'use client'
import { ILanguages } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox, Input, Textarea } from '@nextui-org/react'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ILanguages>()

  return (
    <>
      <Controller
        control={control}
        name="codigo"
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Código"
            label="Código"
            labelPlacement="outside"
            placeholder="Ejemplo: ING"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.codigo ? true : false}
            errorMessage={errors.codigo?.message as string}
          />
        )}
      />
      <Controller
        name="nombre"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Nombre del idioma"
            label="Nombre del idioma"
            labelPlacement="outside"
            placeholder="Ejemplo: Curso de inglés"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.nombre ? true : false}
            errorMessage={errors.nombre?.message as string}
          />
        )}
      />
      <Controller
        name="descripcion"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            aria-label="descripcion"
            label="Descripción del idioma"
            labelPlacement="outside"
            placeholder="Ejemplo: Este curso es para aprender inglés"
            radius="sm"
            variant="bordered"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.descripcion ? true : false}
            errorMessage={errors.descripcion?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="is_active"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            isSelected={value}
            onValueChange={onChange}
            defaultChecked
          >
            Activo
          </Checkbox>
        )}
      />
    </>
  )
}
