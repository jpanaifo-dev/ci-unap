'use client'
import { useEffect } from 'react'
import { IPublicationFile } from '@/types'
import { Select, SelectItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { usePublicationsFilesTypes } from '../../../hooks'

export const PFileTypeData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPublicationFile>()

  const { getPublicationsFilesTypes, listPublicationsFileType, loading } =
    usePublicationsFilesTypes()

  useEffect(() => {
    getPublicationsFilesTypes({
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataList = listPublicationsFileType?.results || []

  return (
    <>
      <Controller
        control={control}
        name="tipo_id"
        rules={{
          required: 'Selecione un tipo de archivo',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="File type"
            label="Tipo de archivo"
            labelPlacement="outside"
            placeholder="Seleccione el tipo de archivo"
            radius="sm"
            variant="bordered"
            selectedKeys={value ? [value] : ['']}
            defaultSelectedKeys={
              dataList.length > 0 ? [dataList[0].id.toString()] : ['']
            }
            disallowEmptySelection
            onChange={onChange}
            isInvalid={errors.tipo_id !== undefined}
            errorMessage={errors.tipo_id?.message as string}
            isLoading={loading}
          >
            {dataList.map((item) => (
              <SelectItem key={item.id.toString()}>{item.nombre}</SelectItem>
            ))}
          </Select>
        )}
      />
    </>
  )
}
