'use client'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { usePrograms } from '@/modules/admin'
import { useFilterFromUrl } from '@/hooks'
import { ILanguages } from '@/types'

function tranformToSelect(
  data: ILanguages[]
): { label: string; value: string }[] {
  const allOption = { label: 'Todos', value: 'all' }
  const transformedData = data.map((item: any) => ({
    label: item.nombre,
    value: item.id,
  }))
  return [allOption, ...transformedData]
}

export const ProgramFilter = () => {
  const { listPrograms, getLanguages, loading } = usePrograms()
  const { getParams, updateFilter } = useFilterFromUrl()

  const programs = listPrograms?.results || []
  const allPrograms = tranformToSelect(programs)
  //Aumenta el item todos a la lista de programas

  const programId = getParams('program_id', 'all')

  const handleProgramChange = (value: Selection) => {
    const result = value
    const id = Object.values(result)[0]
    if (id === 'all') {
      updateFilter('program_id', '')
    } else {
      updateFilter('program_id', id)
    }
  }

  return (
    <Select
      aria-label="Programas"
      variant="bordered"
      radius="sm"
      onClick={() => getLanguages()}
      isLoading={loading}
      selectedKeys={[programId] || ['']}
      onSelectionChange={handleProgramChange}
      defaultSelectedKeys={['all']}
      disallowEmptySelection
      label="Programas"
      labelPlacement="outside-left"
      classNames={{
        label: 'pt-2',
      }}
    >
      {allPrograms?.map((program) => (
        <SelectItem
          aria-label="Programas-items"
          key={program.value}
          value={program.value}
        >
          {program.label}
        </SelectItem>
      ))}
    </Select>
  )
}
