/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPortalFileList } from '@/types'
import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  useFiles,
} from '@/modules/admin'
import { Link } from '@nextui-org/react'

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
]

export const ListFiles = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPortalFiles, listFiles, loading } = useFiles()

  useEffect(() => {
    getPortalFiles({
      page,
      nombre__icontains: query,
    })
  }, [query, page])

  const tiposDocs: IPortalFileList[] = listFiles?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      nombre: item?.nombre,
      archivo: renderTowArchivo(item?.archivo),
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

function renderTowArchivo(url: string) {
  return (
    <Link
      href={'' + url}
      showAnchorIcon
      target="_blank"
      className="font-normal"
    >
      Ver archivo
    </Link>
  )
}
