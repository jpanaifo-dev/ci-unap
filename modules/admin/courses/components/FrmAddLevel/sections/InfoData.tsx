import { ILevel } from '@/types'
import { Checkbox, Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

interface IProps {
  isView?: boolean
}

export const InfoData = (props: IProps) => {
  const { isView } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<ILevel>()

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
            placeholder="Nombre del nivel"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.nombre !== undefined}
            errorMessage={errors.nombre?.message as string}
            isDisabled={isView}
          />
        )}
      />

      <Controller
        control={control}
        name="is_active"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            aria-label="is_active"
            onChange={onChange}
            isSelected={value}
            isDisabled={isView}
          >
            Activo
          </Checkbox>
        )}
      />
    </>
  )
}
