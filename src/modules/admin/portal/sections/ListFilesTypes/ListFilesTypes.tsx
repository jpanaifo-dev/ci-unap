/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPortalFileType } from '@/types'
import { usePathname } from 'next/navigation'
import {
  TableCustom,
  IColumns,
  IRows,
  useFilesTypes,
  IActions,
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

export const ListFilesTypes = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPortalFilesTypes, listFiles, loading } = useFilesTypes()
  const pathname = usePathname()

  const isFileType = pathname === '/admin/portal/archivos/tipos'

  useEffect(() => {
    if (isFileType) {
      getPortalFilesTypes({
        page,
        name: query,
      })
    }
  }, [query, page, pathname])

  const tiposDocs: IPortalFileType[] = listFiles?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      nombre: item?.nombre,
      status: item?.is_active,
      actions: 'actions',
    }
  })

  return (
    <>
      <TableCustom
        placeholder="Buscar archivo"
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
          count: listFiles?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}
