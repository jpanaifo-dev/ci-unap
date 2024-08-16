import { ITypePayments } from '@/types'
import { Checkbox, Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'
import { IconCoin } from '@tabler/icons-react'

export const InfoData = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ITypePayments>()

  const id = watch('id')

  return (
    <>
      <Controller
        control={control}
        name="codigo"
        rules={{
          required: 'Ingrese un código',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Código"
            placeholder="Ingrese el código del concepto"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.codigo !== undefined}
            errorMessage={errors.codigo?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="concepto"
        rules={{
          required: 'Ingrese el concepto',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Concepto"
            placeholder="Ingrese el concepto del pago"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.concepto !== undefined}
            errorMessage={errors.concepto?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="monto"
        rules={{
          required: 'Ingrese el concepto',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Ingrese un monto válido',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Monto"
            placeholder="Ingrese el monton del pago"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            endContent={<IconCoin className="text-gray-500" />}
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
