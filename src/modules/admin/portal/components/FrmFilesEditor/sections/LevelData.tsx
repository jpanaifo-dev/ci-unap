/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IEnrollment, IPortalFile } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem } from '@nextui-org/react'
import { useFilesTypes } from '@/modules/admin'

export const LevelData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPortalFile>()
  const [search, setSearch] = useState('')
  const { getPortalFilesTypes, listFiles, loading } = useFilesTypes()

  useEffect(() => {
    getPortalFilesTypes({
      page: 1,
      name: search,
    })
  }, [search])

  const dataList = listFiles?.results || []

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
            selectedKeys={[String(value)] ?? ['']}
            defaultSelectedKeys={['1']}
            disallowEmptySelection
            onChange={onChange}
            isInvalid={errors.tipo !== undefined}
            errorMessage={errors.tipo?.message as string}
            isLoading={loading}
          >
            {dataList.map((item) => (
              <SelectItem
                key={item.id}
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
