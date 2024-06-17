/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense, useState } from 'react'
import {
  TableCustom,
  IColumns,
  IRows,
  useLevels,
  IActions,
} from '@/modules/admin'
import { ILevel } from '@/types'
import { usePathname } from 'next/navigation'

const col: IColumns[] = [
  {
    key: 'id',
    label: 'Id-Cod',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]

const actions: IActions[] = [
  {
    label: 'Editar',
    href: '/admin/idiomas/niveles',
  },
  {
    label: 'Detalles',
    href: '',
  },
]

export const ListLevels = () => {
  const [query, setQuery] = useState('')
  const { listLevels: data, getLevels } = useLevels()
  const pathname = usePathname()

  const isNiveles = pathname === '/admin/idiomas/niveles'

  useEffect(() => {
    getLevels()
  }, [isNiveles])

  const courses: ILevel[] = data?.results || []
  const rows: IRows[] = courses?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.nombre,
      status: item?.is_active,
      actions: 'actions',
    }
  })


  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <>
      <Suspense>
        <TableCustom
          disableInputSearch={true}
          columns={col}
          rows={rows || []}
          actionsList={actions}
          searchValue={query}
          onSearch={handleSearch}
        />
      </Suspense>
    </>
  )
}
