import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const ContactData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <>
      <Controller
        name="direccion"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Dirección"
            label="Dirección actual"
            labelPlacement="outside"
            placeholder="Ejemplo: Jr. Los Pinos 123"
            radius="sm"
            variant="bordered"
            value={value}
            onChange={onChange}
            isInvalid={errors.direccion ? true : false}
            errorMessage={errors.direccion?.message as string}
          />
        )}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Controller
          name="correo"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Correo electrónico"
              label="Correo electrónico"
              labelPlacement="outside"
              placeholder="Ejemplo: correo@correo.com"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.correo ? true : false}
              errorMessage={errors.correo?.message as string}
            />
          )}
        />
        <Controller
          name="celular"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Teléfono"
              label="Celular"
              labelPlacement="outside"
              placeholder="Ejemplo: 123456789"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.celular ? true : false}
              errorMessage={errors.celular?.message as string}
            />
          )}
        />
      </div>
    </>
  )
}
