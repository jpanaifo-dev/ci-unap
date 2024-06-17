/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ITypePayments } from '@/types'
import {
  TableCustom,
  IColumns,
  IRows,
  usePayConcepts,
  IActions,
} from '@/modules/admin'
import { useEffect, useState } from 'react'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'codigo',
    label: 'Código',
    align: 'center',
  },
  {
    key: 'concepto',
    label: 'Concepto',
    align: 'center',
  },
  {
    key: 'monto',
    label: 'Monto',
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

export const ListPayConcepts = () => {
  const { loading, getPayConcepts, listPayConcepts } = usePayConcepts()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPayConcepts({
      page,
      concepto__icontains: query
    })
  }, [page, query])

  const payments: ITypePayments[] = listPayConcepts?.results || []

  const rows: IRows[] = payments?.map((item) => {
    return {
      key: item.id,
      codigo: item.codigo,
      concepto: item.concepto,
      monto: item.monto,
      status: item.is_active,
      actions: 'actions',
    }
  })

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <>
      <TableCustom
        placeholder='Buscar concepto por nombre'
        columns={col}
        rows={rows || []}
        actionsList={actions}
        loading={loading}
        onSearch={handleSearch}
        searchValue={query}
        pagination={{
          page: page,
          count: listPayConcepts?.count || 0,
          rowsPerPage: 15,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}
