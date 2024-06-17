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
import { usePathname } from 'next/navigation'
import { formatDate } from '@/utils'
import { renderContent } from '@/modules/core'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'titulo',
    label: 'Titulo',
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
    key: 'banner',
    label: 'Visualizar en banner',
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
  {
    label: 'Añadir contenido',
    href: 'contenido',
  },
]

export const ListPublications = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPublications, listPublications, loading } = usePublications()
  const pathname = usePathname()

  const isContent = pathname === '/admin/portal/publicaciones'

  useEffect(() => {
    if (isContent) {
      getPublications({
        page,
        name: query,
      })
    }
  }, [query, page, pathname])

  const publications: IPublication[] = listPublications?.results || []

  const rows: IRows[] = publications?.map((item) => {
    return {
      key: item?.id,
      titulo: item?.titulo,
      contenido: renderColumContent(item?.contenido),
      fecha: formatDate(item?.fecha),
      tipo: item?.tipo?.nombre,
      banner: item?.is_banner ? 'Si' : 'No',
      status: item?.is_active,
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

const renderColumContent = (content: string) => {
  return (
    <div
      dangerouslySetInnerHTML={renderContent(content)}
      className="text-justify line-clamp-3 text-sm"
    />
  )
}
