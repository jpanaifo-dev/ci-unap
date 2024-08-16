'use client'
import { Input, Select, SelectItem, Selection } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useFilterFromUrl } from '@/hooks'

interface IProps {
  optionsFilter: {
    label: string
    value: string
  }[]
  placeholder?: string
  defaultSelectedKeys?: string
  classNames?: {
    mainWrapper: string
    base: string
  }
}

const defaultClassName = {
  mainWrapper: 'w-48',
  base: 'w-full w-48',
}

export const QueryFilter = (props: IProps) => {
  const { optionsFilter, defaultSelectedKeys, classNames, placeholder } = props

  const { updateFilter, getParams } = useFilterFromUrl()

  const queryType = getParams('queryType', '')
  const query = getParams('query', '')

  const handleFilter = (value: Selection) => {
    const filter = Object.values(value)[0]

    if (filter === defaultSelectedKeys) {
      updateFilter('queryType', '')
      return
    }
    updateFilter('queryType', filter)
  }

  const handleQuery = async (value: string) => {
    await updateFilter('query', value)
  }

  return (
    <Input
      aria-label="Buscar"
      variant="bordered"
      radius="sm"
      startContent={
        <div>
          <IconSearch size={18} />
        </div>
      }
      endContent={
        <Select
          aria-label="Filtrar por"
          size="sm"
          radius="sm"
          defaultSelectedKeys={[`${defaultSelectedKeys}`]}
          disallowEmptySelection
          classNames={classNames || defaultClassName}
          value={queryType}
          onSelectionChange={(value) => handleFilter(value)}
        >
          {optionsFilter.map((item) => (
            <SelectItem
              aria-label="options-items"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
      }
      placeholder={placeholder || 'Escribe para buscar...'}
      value={query}
      onValueChange={handleQuery}
    />
  )
}
