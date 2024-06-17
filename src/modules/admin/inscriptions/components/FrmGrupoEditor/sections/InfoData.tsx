'use client'
import {
  DateRangePicker,
  Input,
  Select,
  SelectItem,
  CalendarDate,
  RangeValue,
  Checkbox,
} from '@nextui-org/react'
import { IGroup } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { parseDate } from '@internationalized/date'

const optionGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const InfoData = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<IGroup>()

  const handleChangeRange = (value: RangeValue<CalendarDate>) => {
    if (value && value.start && value.end) {
      const dateInit = String(value.start)
      const dateEnd = String(value.end)
      setValue('fecha_inicio', dateInit)
      setValue('fecha_final', dateEnd)
      setValue('range', value)
    }
  }

  const isEdit = watch('id')

  return (
    <>
      <div className="w-full flex gap-4 items-center">
        <Controller
          control={control}
          name="grupo"
          rules={{
            required: 'Seleccione un grupo',
          }}
          render={({ field: { value, onChange } }) => (
            <Select
              aria-label="Grupo"
              radius="sm"
              variant="bordered"
              placeholder="Seleccione un grupo"
              label="Grupo"
              labelPlacement="outside"
              description="Grupo al que pertenece el modulo"
              selectedKeys={String([value]) ?? ['']}
              onChange={onChange}
              isInvalid={errors.grupo !== undefined}
              errorMessage={errors.grupo?.message as string}
            >
              {optionGroup.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="aforo"
          rules={{
            required: 'Ingrese un nombre',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Ingrese un aforo válido',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="Aforo"
              label="Aforo"
              placeholder="Ejemplo: 10"
              labelPlacement="outside"
              radius="sm"
              variant="bordered"
              value={value ? String(value) : ''}
              onValueChange={onChange}
              isInvalid={errors.aforo !== undefined}
              errorMessage={errors.aforo?.message as string}
              description="Cantidad de personas que pueden inscribirse en el grupo"
              type="number"
              min={0}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="range"
        rules={{
          required: 'Seleccione un rango',
        }}
        render={({ field: { value } }) => {
          const startDate = value?.start ?? parseDate('2024-01-01');
          const endDate = value?.end ?? parseDate('2024-01-31');
          return (
            <DateRangePicker
              aria-label="Fecha de inicio y fin"
              label="Fecha de inicio y fin"
              radius="sm"
              variant="bordered"
              labelPlacement="outside"
              visibleMonths={3}
              value={{ start: startDate, end: endDate }}
              onChange={handleChangeRange}
              isInvalid={errors.range !== undefined}
              errorMessage={errors.range?.message as string}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="resolucion"
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Resolución"
            label="Resolución"
            placeholder="Ejemplo: 1234"
            labelPlacement="outside"
            radius="sm"
            variant="bordered"
            value={value ? String(value) : ''}
            onValueChange={onChange}
            isInvalid={errors.resolucion !== undefined}
            errorMessage={errors.resolucion?.message as string}
          />
        )}
      />
      {isEdit && (
        <Controller
          control={control}
          name="is_active"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              aria-label="Activo"
              isSelected={value}
              onValueChange={onChange}
              defaultChecked
            >
              Activo
            </Checkbox>
          )}
        />
      )}
    </>
  )
}
