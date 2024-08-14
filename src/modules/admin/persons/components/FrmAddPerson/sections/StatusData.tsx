/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IPerson } from '@/types'
import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

import { LayoutFrmHorizontal, useCivilStatus } from '@/modules/admin'

const optionsSexo = [
  { id: 'M', sexo: 'Masculino' },
  { id: 'F', sexo: 'Femenino' },
]

export const StatusData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  const { getCivilStatus, listStatus, loading } = useCivilStatus()

  useEffect(() => {
    getCivilStatus()
  }, [])

  const docsType = listStatus?.results || []

  return (
    <LayoutFrmHorizontal
      title="Datos de estado civil"
      subtitle="Ingresa los datos de estado civil de la persona"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Controller
          name="sexo"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              aria-label="Sexo"
              label="Sexo"
              labelPlacement="outside"
              placeholder="Seleccione..."
              radius="sm"
              variant="bordered"
              selectedKeys={value ? [String(value)] : []}
              onChange={(value) => {
                onChange(value)
              }}
              isInvalid={errors.sexo ? true : false}
              errorMessage={errors.sexo?.message as string}
            >
              {optionsSexo.map((option) => (
                <SelectItem
                  aria-label="Sexo item"
                  key={option.id}
                  value={option.id}
                >
                  {option.sexo}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="estado_civil"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              aria-label="Estado civil"
              label="Estado civil"
              labelPlacement="outside"
              placeholder="Seleccione..."
              radius="sm"
              variant="bordered"
              selectedKeys={value ? [String(value)] : []}
              onChange={onChange}
              isInvalid={errors.estado_civil !== undefined}
              errorMessage={errors.estado_civil?.message as string}
              isLoading={loading}
            >
              {docsType?.map((typeDoc) => (
                <SelectItem
                  aria-label="Estado civil item"
                  key={typeDoc.id}
                  value={typeDoc.id}
                >
                  {typeDoc.estado}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Controller
          name="ocupacion"
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Ocupación"
              label="Ocupación"
              labelPlacement="outside"
              placeholder="Ejemplo: Ingeniero"
              radius="sm"
              variant="bordered"
              value={value}
              onChange={onChange}
              isInvalid={errors.ocupacion ? true : false}
              errorMessage={errors.ocupacion?.message as string}
            />
          )}
        />
        <Controller
          name="is_trabajador"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              isSelected={value}
              onChange={onChange}
            >
              Trabaja
            </Checkbox>
          )}
        />
      </div>
    </LayoutFrmHorizontal>
  )
}
