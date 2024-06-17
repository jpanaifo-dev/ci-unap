import { Checkbox } from '@nextui-org/react'
import { IProceeding } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionsData = () => {
  const { control } = useFormContext<IProceeding>()
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
          name="is_graduated"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              aria-label="Graduado"
              color="default"
              isSelected={value}
              onChange={onChange}
            >
              Graduado
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name="is_retirate"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              aria-label="Cancelado"
              color="default"
              isSelected={value}
              onChange={onChange}
            >
              Retirado
            </Checkbox>
          )}
        />
      </div>
    </>
  )
}
