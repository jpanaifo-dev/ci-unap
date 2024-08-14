/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  TableCustom,
  IColumns,
  IRows,
  usePublicationsTypes,
} from '@/modules/admin'

import { IPublicationType } from '@/types'

const columns: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Tipo de publicación',
    align: 'center',
  },
]

interface IProps {
  onSelectValue: (value: IRows) => void
}

export const ListPublicationsType = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectValue } = props
  const { getPublicationsTypes, listPublicationsType, loading } =
    usePublicationsTypes()

  useEffect(() => {
    getPublicationsTypes({
      page: 1,
      nombre__icontains: query,
    })
  }, [])

  const dataList: IPublicationType[] = listPublicationsType?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      nombre: item.nombre,
    }
  })

  return (
    <>
      <TableCustom
        columns={columns}
        rows={rows}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        selectionMode="single"
        onSelectionChange={(selectedRow) => {
          onSelectValue(selectedRow)
        }}
        loading={loading}
      />
    </>
  )
}
