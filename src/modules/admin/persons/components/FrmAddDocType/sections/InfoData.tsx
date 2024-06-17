import { ITypeDoc } from '@/types'
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
  } = useFormContext<ITypeDoc>()

  return (
    <>
      <Controller
        control={control}
        name="documento"
        rules={{
          required: 'Ingrese un nombre',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Nombre"
            placeholder="Nombre del nivel"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.documento !== undefined}
            errorMessage={errors.documento?.message as string}
            isDisabled={isView}
          />
        )}
      />

      <Controller
        control={control}
        name="is_active"
        render={({ field: { value, onChange } }) => (
          <Checkbox
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
