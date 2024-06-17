/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPortalFileType } from '@/types'
import { usePathname } from 'next/navigation'
import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  usePublicationsTypes,
} from '@/modules/admin'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Nombre del archivo',
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
    href: '',
    label: 'Editar',
  },
]

export const ListPublicationTypes = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPublicationsTypes, listPublicationsType, loading } =
    usePublicationsTypes()
  const pathname = usePathname()

  const isPath = pathname === '/admin/portal/publicaciones/tipo-publicaciones'

  useEffect(() => {
    if (isPath) {
      getPublicationsTypes({
        page,
        name: query,
      })
    }
  }, [query, page, pathname])

  const dataList: IPortalFileType[] = listPublicationsType?.results || []

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item?.id,
      nombre: item?.nombre,
      status: item?.is_active ? 'Activo' : 'Inactivo',
      actions: 'actions',
    }
  })

  return (
    <>
      <TableCustom
        placeholder="Buscar tipo de publicacion"
        columns={col}
        actionsList={actions}
        rows={rows || []}
        loading={loading}
        searchValue={query}
        onSearch={(value) => {
          setQuery(value)
          setPage(1)
        }}
        pagination={{
          page,
          count: listPublicationsType?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}
