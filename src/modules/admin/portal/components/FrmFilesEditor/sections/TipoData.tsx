/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IPortalFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { useFilesTypes } from '@/modules/admin'

export const TipoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPortalFile>()
  const { getPortalFilesTypes, listFiles, loading } = useFilesTypes()

  useEffect(() => {
    getPortalFilesTypes({
      page: 1,
    })
  }, [])

  const dataList = listFiles?.results || []

  const handleSelectChange = (value: Selection) => {
    const selected = Object.values(value)[0]
    return selected
  }

  return (
    <>
      <Controller
        control={control}
        name="tipo"
        rules={{
          required: 'Selecione un nivel',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="File type"
            label="Tipo de archivo"
            labelPlacement="outside"
            placeholder="Seleccione el tipo de archivo"
            radius="sm"
            variant="bordered"
            disallowEmptySelection
            selectedKeys={[value]}
            onSelectionChange={(value) => {
              onChange(handleSelectChange(value))
            }}
            isInvalid={errors.tipo !== undefined}
            errorMessage={errors.tipo?.message as string}
            isLoading={loading}
          >
            {dataList?.map((item) => (
              <SelectItem
                key={String(item.id)}
                aria-label={`item-${item.id}`}
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
