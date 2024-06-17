'use client'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { useFilterFromUrl } from '@/hooks'

const statusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

export const StatusFilter = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  //Aumenta el item todos a la lista de programas

  const handleStatusChange = (value: Selection) => {
    const result = value
    const status = Object.values(result)[0]
    if (status === 'all') {
      updateFilter('status', '')
    } else {
      updateFilter('status', status)
    }
  }

  return (
    <>
      <Select
        aria-label="Estado"
        variant="bordered"
        radius="sm"
        selectedKeys={[getParams('status', 'all')] || ['']}
        onSelectionChange={handleStatusChange}
        defaultSelectedKeys={['all']}
        disallowEmptySelection
        label="Estados"
        labelPlacement="outside-left"
        classNames={{
          label: 'pt-2',
        }}
      >
        {statusOptions.map((status) => (
          <SelectItem
            aria-label="Estado-items"
            key={status.value}
            value={status.value}
          >
            {status.label}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
