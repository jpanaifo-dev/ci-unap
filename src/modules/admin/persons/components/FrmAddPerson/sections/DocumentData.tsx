/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IPerson } from '@/types'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

import { useTypeDoc } from '@/modules/admin'

export const DocumentData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  const { getTypeDocs, typesDoc, loading } = useTypeDoc()

  useEffect(() => {
    getTypeDocs()
  }, [])

  const docsType = typesDoc?.results || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <Controller
        name="tipo_documento"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="Tipo de documento"
            label="Tipo de documento"
            labelPlacement="outside"
            placeholder="Seleccione..."
            radius="sm"
            variant="bordered"
            selectedKeys={[String(value)] || ['']}
            onChange={onChange}
            isInvalid={errors.tipo_documento ? true : false}
            errorMessage={errors.tipo_documento?.message as string}
            isLoading={loading}
          >
            {docsType?.map((typeDoc) => (
              <SelectItem
                key={typeDoc.id}
                value={typeDoc.id}
              >
                {typeDoc.documento}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="numero_documento"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Número de documento"
            label="Número de documento"
            labelPlacement="outside"
            placeholder="Ejemplo: 12345678"
            radius="sm"
            variant="bordered"
            value={value || ''}
            onChange={onChange}
            isInvalid={errors.numero_documento ? true : false}
            errorMessage={errors.numero_documento?.message as string}
          />
        )}
      />
    </div>
  )
}
