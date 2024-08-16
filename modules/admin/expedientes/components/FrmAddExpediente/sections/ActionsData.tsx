import { Checkbox } from '@nextui-org/react'
import { IProceeding } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionsData = () => {
  const { control, setValue, getValues } = useFormContext<IProceeding>()

  const handleStateChange = (state: 'is_graduated' | 'is_retirate') => {
    const values = getValues();
    if (state === 'is_graduated' && values.is_retirate) {
      setValue('is_retirate', false);
    } else if (state === 'is_retirate' && values.is_graduated) {
      setValue('is_graduated', false);
    }
    setValue(state, !values[state]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className='flex flex-col mb-2'>
          <span className='text-sm'>Estado del expediente:</span>
          <Controller
            control={control}
            name="is_active"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                aria-label="Activo"
                color="default"
                isSelected={value || false}
                onChange={onChange}
              >
                Activo
              </Checkbox>
            )}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm'>Estado del estudiante:</span>
            <Controller
            control={control}
            name="is_graduated"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                aria-label="Graduado"
                color="default"
                isSelected={value || false}
                onChange={() => handleStateChange('is_graduated')}
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
                isSelected={value || false}
                onChange={() => handleStateChange('is_retirate')}
              >
                Retirado
              </Checkbox>
            )}
          />
        </div>
      </div>
    </>
  )
}
