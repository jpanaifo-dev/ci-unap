import { Checkbox } from '@nextui-org/react'
import { IEnrollment } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionsData = () => {
  const { control, watch } = useFormContext<IEnrollment>()
  const isEdit = watch('id')

  return (
    <>
      <div className="flex gap-2">
        <Controller
          control={control}
          name="is_active"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              aria-label="Activo"
              color="default"
              isSelected={value}
              onChange={onChange}
            >
              Activo
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="is_retired"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              aria-label="Cancelado"
              color="default"
              onChange={onChange}
              isSelected={value}
            >
              Retirado
            </Checkbox>
          )}
        />
      </div>
    </>
  )
}
