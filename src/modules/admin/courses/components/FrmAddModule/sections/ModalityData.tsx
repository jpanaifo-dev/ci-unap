/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IModality, IModule } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Chip, Select, SelectItem, Selection } from '@nextui-org/react'

import { useModalities } from '@/modules/admin'
import { useEffect } from 'react'

export const ModalityData = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<IModule>()

  const { getModalities, listModalities, loading } = useModalities()

  const program_id = watch('programa')?.id

  useEffect(() => {
    getModalities({
      name: '',
      program_id: Number(program_id),
      status: '',
    })
  }, [program_id])

  const dataList: IModality[] = listModalities?.results || []

  return (
    <>
      <Controller
        control={control}
        name="modalidad"
        rules={{
          required: 'Selecione una modalidad',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="Modalidad"
            label="Modalidad"
            labelPlacement="outside"
            placeholder="Seleccione una modalidad"
            radius="sm"
            variant="bordered"
            selectedKeys={value ? [String(value?.id)] : ['']}
            onSelectionChange={(e: Selection) => {
              const value = Object.values(e)[0]
              const item = dataList.find((item) => item.id === Number(value))
              onChange(item)
            }}
            isInvalid={errors.modalidad !== undefined}
            errorMessage={errors.modalidad?.message as string}
            isLoading={loading}
            items={dataList}
            isDisabled={program_id ? false : true}
            renderValue={(items) => {
              return items.map((item) => {
                return (
                  <div
                    className="w-full flex gap-2 items-center"
                    key={item.key?.toString()}
                  >
                    <Chip
                      aria-label="chip-modalidad"
                      radius="sm"
                      color="warning"
                      variant="flat"
                    >
                      {item?.data?.programa?.nombre}
                    </Chip>
                    {item?.data?.nombre}
                  </div>
                )
              })
            }}
          >
            {(dataList) => (
              <SelectItem
                aria-label="modalidad-item"
                key={dataList.id.toString()}
                value={String(dataList.id)}
              >
                <div className="w-full flex gap-2 items-center">
                  <Chip
                    aria-label="chip-item"
                    radius="sm"
                    color="warning"
                    variant="flat"
                  >
                    {dataList?.programa?.nombre}
                  </Chip>{' '}
                  {dataList.nombre}
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
    </>
  )
}
