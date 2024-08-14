/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPublicationList } from '@/types'
import { TableCustom, IRows, usePublications } from '@/modules/admin'
import { formatDate } from '@/utils'
import { renderContent } from '@/modules/core'
import { TopContent } from './TopContent'
import { useFilterFromUrl } from '@/hooks'
import { col, actions } from './ListColumns'

export const ListPublications = () => {
  const [page, setPage] = useState(1)
  const { getPublications, listPublications, loading } = usePublications()
  const { getParams } = useFilterFromUrl()

  const query = getParams('query', '')
  const queryType = getParams('queryType', '')
  const date = getParams('date', '')
  const status = getParams('status', '')
  const type = getParams('publicationType', '')

  useEffect(() => {
    getPublications({
      contenido__icontains: query && queryType === 'contenido' ? query : '',
      titulo__icontains: query && queryType === 'titulo' ? query : '',
      fecha: date || '',
      is_active:
        status === 'true' ? true : status === 'false' ? false : undefined,
      tipo: Number(type) || undefined,
    })
  }, [query, page, date, status, type])

  const publications: IPublicationList[] = listPublications?.results || []

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
    <TableCustom
      placeholder="Buscar archivo"
      columns={col}
      rows={rows || []}
      actionsList={actions}
      loading={loading}
      disableInputSearch
      topContent={<TopContent />}
      pagination={{
        page,
        count: listPublications?.count || 0,
        rowsPerPage: 10,
        onChangePage: (page) => setPage(page),
      }}
    />
  )
}

const renderColumContent = (content: string) => {
  return (
    <div
      dangerouslySetInnerHTML={renderContent(content)}
      className="text-justify line-clamp-3 text-xs font-light max-w-2xl"
    />
  )
}
