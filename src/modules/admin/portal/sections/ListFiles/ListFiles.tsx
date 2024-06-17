/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPortalFile } from '@/types'
import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  useFiles,
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
    key: 'archivo',
    label: 'Archivo',
    align: 'center',
  },
  {
    key: 'tipo',
    label: 'Tipo de archivo',
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
    label: 'Detalles',
    href: '',
  },
]

export const ListFiles = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPortalFiles, listFiles, loading } = useFiles()

  useEffect(() => {
    getPortalFiles({
      page,
      name: query,
    })
  }, [query, page])

  const tiposDocs: IPortalFile[] = listFiles?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      nombre: item?.nombre,
      archivo: item?.archivo,
      tipo: item?.tipo?.nombre,
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
          count: listFiles?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}

// function renderColLevel(item: string) {
//   const nameFile = item.split()
//   return <>{item?.nombre}</>
// }
