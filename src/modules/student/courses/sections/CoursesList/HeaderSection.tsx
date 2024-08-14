/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useFilterFromUrl } from '@/hooks'
import { useStudentsProceeding } from '@/modules/student'
import { useEffect } from 'react'

export const HeaderSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { getProceedings, proceedings, loading } = useStudentsProceeding()

  useEffect(() => {
    getProceedings({})
  }, [])

  const dataList = proceedings?.results || []

  const expediente_id = getParams('exp', `${dataList[0]?.id}`)

  const handleChange = (value: string) => {
    if (value === expediente_id) {
      updateFilter('exp', '')
      return
    }
    updateFilter('exp', value)
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
              radius="sm"
              defaultSelectedKeys={[expediente_id] || ['']}
              selectedKeys={[expediente_id] || ['']}
              onChange={(value) => handleChange(value.target.value)}
              isLoading={loading}
              disallowEmptySelection
              items={dataList}
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
                  key={item.id}
                  value={item?.programa?.nombre}
                >
                  {item?.programa?.nombre}
                </SelectItem>
              )}
            </Select>
          </div>
        </section>
      </main>
    </>
  )
}
