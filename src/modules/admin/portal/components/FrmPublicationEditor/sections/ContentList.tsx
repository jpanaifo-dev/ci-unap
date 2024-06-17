/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, usePublications } from '@/modules/admin'

import { IPublication } from '@/types'

const columns: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'contenido',
    label: 'Contenido',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha de publicación',
    align: 'center',
  },
  {
    key: 'tipo',
    label: 'Tipo de contenido',
    align: 'center',
  },
  {
    key: 'banner',
    label: 'Visualizar en banner',
    align: 'center',
  },
]

interface IProps {
  onSelectValue: (value: IRows) => void
}

export const ContentList = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectValue } = props
  const { getPublications, listPublications, loading } = usePublications()

  useEffect(() => {
    getPublications({
      page: 1,
      name: query,
    })
  }, [])

  const dataList: IPublication[] = listPublications?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      contenido: RenderColumnContent(item.contenido),
      fecha: item.fecha,
      tipo: item.tipo.nombre,
      banner: item.is_banner ? 'Si' : 'No',
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

const RenderColumnContent = (value: string) => {
  return (
    <main>
      <h3 className="line-clamp-3">{value}</h3>
    </main>
  )
}
