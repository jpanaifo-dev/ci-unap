/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, usePublications } from '@/modules/admin'

import { IPublicationList } from '@/types'

const columns: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha de publicación',
    align: 'center',
  },
  {
    key: 'titulo',
    label: 'Titulo',
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
      contenido__icontains: query,
    })
  }, [])

  const dataList: IPublicationList[] = listPublications?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      titulo: item.titulo,
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
