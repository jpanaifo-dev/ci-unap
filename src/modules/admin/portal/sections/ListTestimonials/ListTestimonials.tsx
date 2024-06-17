/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { ITestimony } from '@/types'
import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  useTestimonials,
} from '@/modules/admin'
import { cutString, formatDate } from '@/utils'
import { useRouter } from 'next/navigation'

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
    label: 'Publicado',
    align: 'center',
  },
  {
    key: 'tipo',
    label: 'Autor',
    align: 'center',
  },
  {
    key: 'visible',
    label: 'Visible',
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
    label: 'Detalles',
    href: '',
  },
]


export const ListTestimonials = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getTestimonials, listTestimonials, loading } = useTestimonials()

  useEffect(() => {
    getTestimonials({
      page,
      name: query,
    })
  }, [query, page])

  const testimonials: ITestimony[] = listTestimonials?.results || []

  const rows: IRows[] = testimonials?.map((item) => {
    return {
      key: item?.id,
      contenido: cutString(item?.contenido, 60),
      fecha: formatDate(item?.fecha),
      tipo: item?.persona?.nombres + ' ' + item?.persona?.apellido_paterno,
      visible: item?.is_public ? 'Publico' : 'Oculto',
      status: item?.is_active,
      actions: actions,
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
          count: listTestimonials?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}
