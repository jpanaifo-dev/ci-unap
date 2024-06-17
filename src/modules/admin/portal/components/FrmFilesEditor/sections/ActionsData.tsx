import { Checkbox } from '@nextui-org/react'
import { IPortalFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionsData = () => {
  const { control, watch } = useFormContext<IPortalFile>()
  const isEdit = watch('id')

  return (
    <>
      {/* {isEdit && (
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
        </div>
      )} */}
    </>
  )
}
