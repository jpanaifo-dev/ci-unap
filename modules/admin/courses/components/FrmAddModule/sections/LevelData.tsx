/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ILevel, IModule } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem, Selection } from '@nextui-org/react'

import { useLevels } from '@/modules/admin'
import { useEffect } from 'react'

export const LevelData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IModule>()

  const { getLevels, listLevels, loading } = useLevels()

  useEffect(() => {
    getLevels()
  }, [])

  const dataList: ILevel[] = listLevels?.results || []

  return (
    <>
      <Controller
        control={control}
        name="nivel"
        rules={{
          required: 'Selecione un nivel',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="Nivel"
            label="Nivel"
            labelPlacement="outside"
            placeholder="Seleccione un nivel"
            radius="sm"
            variant="bordered"
            selectedKeys={value ? [value?.id?.toString()] : ['']}
            onSelectionChange={(e: Selection) => {
              const value = Object.values(e)[0]
              const item = dataList.find((item) => item.id === Number(value))
              onChange(item)
            }}
            isInvalid={errors.nivel !== undefined}
            errorMessage={errors.nivel?.message as string}
            isLoading={loading}
          >
            {dataList.map((item) => (
              <SelectItem
                aria-label="level-item"
                key={item.id.toString()}
                value={String(item.id)}
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
