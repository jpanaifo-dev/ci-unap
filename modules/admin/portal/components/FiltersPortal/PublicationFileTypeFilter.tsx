'use client'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { usePublicationsFilesTypes } from '@/modules/admin'
import { useFilterFromUrl } from '@/hooks'
import { IPublicationFileType } from '@/types'

function tranformToSelect(
  data: IPublicationFileType[]
): { label: string; value: string }[] {
  const allOption = { label: 'Todos', value: 'all' }
  const transformedData = data.map((item: any) => ({
    label: item.nombre,
    value: item.id,
  }))
  return [allOption, ...transformedData]
}

export const PublicationFileTypeFilter = () => {
  const { getPublicationsFilesTypes, listPublicationsFileType, loading } =
    usePublicationsFilesTypes()
  const { getParams, updateFilter } = useFilterFromUrl()

  const publicationsType = listPublicationsFileType?.results || []
  const allpublicationsType = tranformToSelect(publicationsType)
  //Aumenta el item todos a la lista de programas

  const programId = getParams('publicationType', 'all')

  const handleProgramChange = (value: Selection) => {
    const result = value
    const id = Object.values(result)[0]
    if (id === 'all') {
      updateFilter('publicationType', '')
    } else {
      updateFilter('publicationType', id)
    }
  }

  return (
    <Select
      aria-label="Tipo de publicacion"
      variant="bordered"
      radius="sm"
      onClick={() => getPublicationsFilesTypes({})}
      isLoading={loading}
      selectedKeys={[programId]}
      onSelectionChange={handleProgramChange}
      defaultSelectedKeys={['all']}
      disallowEmptySelection
      label="Tipo"
      labelPlacement="outside-left"
      classNames={{
        label: 'pt-2',
      }}
    >
      {allpublicationsType?.map((publicationType) => (
        <SelectItem
          aria-label="Tipo de publicacion item"
          key={publicationType.value}
          value={publicationType.value}
        >
          {publicationType.label}
        </SelectItem>
      ))}
    </Select>
  )
}