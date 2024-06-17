'use client'
import { useFilterFromUrl } from '@/hooks'
import { Input } from '@nextui-org/react'

export const DateFilter = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const date = getParams('date', '')

  const handleDate = (value: string) => {
    updateFilter('date', value)
  }

  return (
    <>
      <Input
        aria-label="date"
        type="date"
        variant="bordered"
        radius="sm"
        label="Fecha"
        labelPlacement="outside-left"
        value={date}
        onValueChange={(value) => handleDate(value)}
      />
    </>
  )
}
