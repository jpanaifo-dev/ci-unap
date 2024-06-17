import { IPayments } from '@/types'
import { Checkbox, Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<IPayments>()

  const id = watch('id')

  return (
    <>
      <Controller
        control={control}
        name="nombre_cliente"
        rules={{
          required: 'Ingrese el nombre del cliente',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Cliente"
            placeholder="Ingrese el nombre del cliente"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.nombre_cliente !== undefined}
            errorMessage={errors.nombre_cliente?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="num_documento"
        rules={{
          required: 'Ingrese el número de documento',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Número de documento"
            placeholder="Ingrese el número de documento"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.num_documento !== undefined}
            errorMessage={errors.num_documento?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="num_operacion"
        rules={{
          required: 'Ingrese el número de operación',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Ingrese un monto válido',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Número de operación"
            placeholder="Ingrese el número de operación"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.num_operacion !== undefined}
            errorMessage={errors.num_operacion?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="fecha_operacion"
        rules={{
          required: 'Ingrese la fecha de operación',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Fecha de operación"
            placeholder="Ingrese la   fecha de operación"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            type="date"
            isInvalid={errors.fecha_operacion !== undefined}
            errorMessage={errors.fecha_operacion?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="monto"
        rules={{
          required: 'Ingrese el monto',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Ingrese un monto válido',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Monto"
            label="Monto"
            placeholder="Ingrese el monto"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.monto !== undefined}
            errorMessage={errors.monto?.message as string}
          />
        )}
      />

      {id && (
        <Controller
          control={control}
          name="is_active"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              onChange={onChange}
              isSelected={value}
            >
              Activo
            </Checkbox>
          )}
        />
      )}
    </>
  )
}
