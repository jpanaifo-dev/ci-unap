/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IColumns, TableCustom, usePublicationsFile } from '@/modules/admin'
import { converDate } from '@/utils'
import { renderContent } from '@/modules/core'
import { usePathname } from 'next/navigation'

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
    key: 'publicacion',
    label: 'Publicación',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha de publicación',
    align: 'center',
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
  const { getPublicationsFile, listPublicationsFiles, loading } =
    usePublicationsFile()

  const pathname = usePathname()

  const isContent = pathname === '/admin/portal/contenidos'

  useEffect(() => {
    if (isContent) {
      getPublicationsFile({
        page,
        name: query,
      })
    }
  }, [query, page, pathname])

  const dataList = listPublicationsFiles?.results || []

  const rows = dataList.map((item) => {
    return {
      key: item.id,
      publicacion: renderColumContent(item.publicacion.contenido),
      fecha: converDate(item.publicacion.fecha),
      // archivo: (
      //   <Image
      //     src={urlBase?.slice(0, -1) + item.archivo}
      //     alt="imagen"
      //     removeWrapper
      //     radius="none"
      //     className="w-full h-56 object-cover"
      //   />
      // ),
      type: item.tipo.nombre,
      status: item.is_active,
      actions: '',
    }
  })

  return (
    <main>
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
      />
    </main>
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
