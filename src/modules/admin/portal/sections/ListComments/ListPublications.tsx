/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPublication } from '@/types'
import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  usePublications,
} from '@/modules/admin'

const col: IColumns[] = [
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
    label: 'Fecha de publicacion',
    align: 'center',
  },
  {
    key: 'tipo',
    label: 'Tipo de publicacion',
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
    href: '',
  },
]

export const ListPublications = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPublications, listPublications, loading } = usePublications()

  useEffect(() => {
    getPublications({
      page,
      name: query,
    })
  }, [query, page])

  const publications: IPublication[] = listPublications?.results || []

  const rows: IRows[] = publications?.map((item) => {
    return {
      key: item?.id,
      contenido: item?.contenido,
      fecha: item?.fecha,
      tipo: item?.tipo?.nombre,
      status: item?.is_active ? 'Activo' : 'Inactivo',
      actions: 'actions',
    }
  })

  return (
    <>
      <TableCustom
        placeholder="Buscar archivo"
        columns={col}
        rows={rows || []}
        actionsList={actions}
        loading={loading}
        searchValue={query}
        onSearch={(value) => {
          setQuery(value)
          setPage(1)
        }}
        pagination={{
          page,
          count: listPublications?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}
