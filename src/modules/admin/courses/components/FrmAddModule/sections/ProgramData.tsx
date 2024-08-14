/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { ILanguages, IModule } from '@/types'
import { usePrograms } from '@/modules/client'
import { useEffect } from 'react'

export const ProgramData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IModule>()

  const { getProgramsActive, listPrograms, loading } = usePrograms()

  useEffect(() => {
    getProgramsActive({ search: '' })
  }, [])

  const dataList: ILanguages[] = listPrograms?.results || []

  return (
    <>
      <Controller
        control={control}
        name="programa"
        rules={{
          required: 'Ingrese un nombre',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="Programa"
            label="Programa"
            labelPlacement="outside"
            placeholder="Seleccione un programa"
            radius="sm"
            variant="bordered"
            selectedKeys={value ? [value?.id?.toString()] : ['']}
            onSelectionChange={(e: Selection) => {
              const value = Object.values(e)[0]
              const item = dataList.find((item) => item.id === Number(value))
              onChange(item)
            }}
            isInvalid={errors.nombre !== undefined}
            errorMessage={errors.nombre?.message as string}
            isLoading={loading}
          >
            {dataList.map((item) => (
              <SelectItem
                key={item.id.toString()}
                aria-label={`Programa ${item.nombre}`}
              >
                {item.nombre}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </>
  )
}
