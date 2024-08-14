/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import { IColumns, TableCustom, usePublicationsFile } from '@/modules/admin'
import { converDate } from '@/utils'
import { Link } from '@nextui-org/react'
import { TopContent } from './TopContent'
import { useFilterFromUrl } from '@/hooks'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

const col: IColumns[] = [
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
    key: 'publicacion',
    label: 'Publicación',
    align: 'center',
  },
  {
    key: 'descripcion',
    label: 'Descripción del archivo',
    align: 'start',
  },

  {
    key: 'archivo',
    label: 'Archivo',
    align: 'center',
  },
  {
    key: 'type',
    label: 'Tipo de archivo',
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

export const ListPublicationsFiles = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getPublicationsFileList, listPublicationsFiles, loading } =
    usePublicationsFile()
  const { getParams } = useFilterFromUrl()

  const date = getParams('date', '')
  const status = getParams('status', '')
  // const publicationType = getParams('publicationType', '')

  useEffect(() => {
    getPublicationsFileList({
      page,
      publicacion__titulo__icontains: query,
      publicacion__fecha: date,
      is_active:
        status === 'true' ? true : status === 'false' ? false : undefined,
    })
  }, [query, page, date, status])

  const dataList = listPublicationsFiles?.results || []

  const rows = dataList.map((item) => {
    return {
      key: item.id,
      publicacion: item.publicacion.titulo,
      fecha: converDate(item.publicacion.fecha),
      archivo: RenderArchivo(item.archivo),
      descripcion: item.descripcion,
      type: item.tipo.nombre,
      status: item.is_active,
      actions: '',
    }
  })

  return (
    <main>
      <Suspense fallback={<div>Cargando...</div>}>
        <TableCustom
          placeholder="Buscar archivo"
          columns={col}
          rows={rows || []}
          loading={loading}
          searchValue={query}
          onSearch={(value) => {
            setQuery(value)
            setPage(1)
          }}
          pagination={{
            page,
            count: listPublicationsFiles?.count || 0,
            rowsPerPage: 10,
            onChangePage: (page) => setPage(page),
          }}
          topContent={<TopContent />}
        />
      </Suspense>
    </main>
  )
}

export const RenderArchivo = (path: string) => {
  return (
    <Link
      href={`${urlBase?.slice(0, -1) + path} ` || '#'}
      target="_blank"
      showAnchorIcon
      size="sm"
      className="font-normal"
    >
      Ver archivo
    </Link>
  )
}
