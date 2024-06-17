import { ITeach } from '@/types'
import { Select, SelectItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

const optionsGrado = [
  { key: 'M', label: 'Maestro' },
  { key: 'D', label: 'Doctor' },
]

export const AcademicData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ITeach>()

  return (
    <>
      <Controller
        control={control}
        name="grado_academico"
        rules={{
          required: 'Seleccione un grado académico',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="grado_academico"
            label="Grado académico"
            labelPlacement="outside"
            placeholder="Seleccionar grado académico"
            disallowEmptySelection
            selectedKeys={[value] || ['']}
            onChange={(value) => onChange(value)}
            defaultSelectedKeys={['M']}
            isInvalid={errors.grado_academico !== undefined}
            errorMessage={errors.grado_academico?.message as string}
            variant="bordered"
            radius="sm"
          >
            {optionsGrado.map((item) => (
              <SelectItem
                aria-label="grado_academico"
                key={item.key}
                value={item.key}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </>
  )
}
