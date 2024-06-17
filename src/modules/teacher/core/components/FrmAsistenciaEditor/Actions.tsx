'use client'
import { useFormContext, Controller } from 'react-hook-form'
import { Radio, RadioGroup } from '@nextui-org/react'
import { IAsistencia } from '@/types'

export const Actions = () => {
  const { control } = useFormContext<IAsistencia>()

  return (
    <main className="flex items-center flex-col justify-center">
      <Controller
        control={control}
        name="asistencia"
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            aria-label="Asistencia del alumno"
            value={value}
            onChange={onChange}
            className="flex gap-2"
            size="lg"
            orientation="horizontal"
          >
            <Radio value="P">Presente</Radio>
            <Radio value="J">Justificado</Radio>
            <Radio value="F">Falta</Radio>
          </RadioGroup>
        )}
      />
    </main>
  )
}
