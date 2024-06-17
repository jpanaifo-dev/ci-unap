import { IModality, ITestimony } from '@/types'
import { Checkbox } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionData = () => {
  const { control } = useFormContext<ITestimony>()

  return (
    <>
      <Controller
        control={control}
        name="is_active"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            aria-label="is_active"
            onChange={onChange}
            isSelected={value}
          >
            Activo
          </Checkbox>
        )}
      />
      <Controller
        control={control}
        name="is_public"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            aria-label="is_public"
            onChange={onChange}
            isSelected={value}
          >
            Público
          </Checkbox>
        )}
      />
    </>
  )
}
