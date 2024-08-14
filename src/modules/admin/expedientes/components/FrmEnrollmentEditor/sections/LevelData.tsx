/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IEnrollment } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { useLevels, useEnrollments } from '@/modules/admin'

export const LevelData = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<IEnrollment>()

  const { getLevels, listLevels, loading } = useLevels()
  const { getEnrollments, listEnrollmetns } = useEnrollments()

  const exp = watch('expediente')
  const id = watch('id')

  useEffect(() => {
    getLevels()
  }, [])

  useEffect(() => {
    if (exp) {
      getEnrollments({
        page: 1,
        expediente_id: String(exp.id),
      })
    }
  }, [exp])

  const dataListLevels = listLevels?.results || []
  const dataListEnrrollment: IEnrollment[] =
    listEnrollmetns && listEnrollmetns?.results?.length > 0
      ? listEnrollmetns.results
      : []

  const listExcludeByExp = id
    ? dataListLevels
    : dataListLevels.filter(
        (item) =>
          !dataListEnrrollment.find((enr) => enr?.nivel?.id === item?.id)
      )

  return (
    <>
      <section className="bg-warning-50 p-4 rounded-sm border-l-8 border-l-warning-500">
        <h3 className="text-sm font-semibold">
          Solo aparecerán los niveles que el expediente no tenga matriculado
        </h3>
        <p className="text-xs text-gray-500">
          Seleccione un nivel para la matricula del expediente seleccionado
        </p>
      </section>
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
            onSelectionChange={(selected: Selection) => {
              const value = Object.values(selected)[0]
              const item = dataListLevels.find(
                (item) => Number(item.id) === Number(value)
              )
              onChange(item)
            }}
            selectedKeys={value ? [String(value.id)] : []}
            isInvalid={errors.nivel !== undefined}
            errorMessage={errors.nivel?.message as string}
            isLoading={loading}
            isDisabled={!exp}
          >
            {listExcludeByExp?.map((item) => (
              <SelectItem
                aria-label={`Nivel ${item.nombre}`}
                key={item.id}
                value={item.id}
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
