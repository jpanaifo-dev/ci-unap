'use client'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import { useFilterFromUrl } from '@/hooks'

const activeValues = [
  {
    id: 1,
    value: '0',
    label: 'Mis grupos cerrados',
  },
  {
    id: 2,
    value: '1',
    label: 'Mis grupos activos',
  },
  {
    id: 3,
    value: '3',
    label: 'Todos mis grupos',
  },
]

export const HeaderSection = () => {
  const searchParams = useSearchParams()
  const { getParams, updateFilter } = useFilterFromUrl()

  const value = searchParams.get('status') || '1'

  const handleChange = (value: string) => {
    if (value === '1') {
      updateFilter('status', '')
      return
    }
    updateFilter('status', value)
  }

  return (
    <>
      <main>
        <section className="pb-4 flex gap-4">
          <div className="w-full max-w-sm">
            <Input
              aria-label="Buscar grupo..."
              placeholder="Escribir para buscar idioma..."
              radius="sm"
              variant="bordered"
              startContent={<IconSearch size={20} />}
              onValueChange={(value) => updateFilter('search', value)}
              value={getParams('search', '')}
            />
          </div>
          <div className="w-full max-w-60">
            <Select
              aria-label="Filtrar por estado"
              variant="flat"
              color={
                value === '0' ? 'danger' : value === '1' ? 'success' : 'primary'
              }
              radius="sm"
              selectedKeys={[value] || ['']}
              // defaultSelectedKeys={[value] || ['']}
              onChange={(value) => handleChange(value.target.value)}
              disallowEmptySelection
              items={activeValues}
              classNames={{
                base: [
                  'w-full',
                  'max-w-60',
                  'text-sm',
                  'rounded-lg',
                  'border-small',
                  'bg-background',
                  'data-[focus=true]:border-default-500',
                  'data-[focus=true]:ring-default-500',
                  'data-[focus=true]:shadow-default',
                  'data-[focus=true]:ring-2',
                ],
              }}
              listboxProps={{
                itemClasses: {
                  base: ['rounded-md', 'px-2 py-1', 'text-default-500'],
                },
              }}
              popoverProps={{
                classNames: {
                  base: 'before:bg-default-200',
                  content: 'p-2 border-small border-divider bg-background',
                },
              }}
            >
              {(item) => (
                <SelectItem
                  aria-label="Filtrar por estado-items"
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              )}
            </Select>
          </div>
        </section>
      </main>
    </>
  )
}
