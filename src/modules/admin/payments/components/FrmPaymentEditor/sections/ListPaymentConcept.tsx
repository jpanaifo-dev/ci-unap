/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, usePayConcepts } from '@/modules/admin'

import { ITypePayments } from '@/types'

const columns: IColumns[] = [
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
]

interface IProps {
  onSelectExp: (concepto: IRows) => void
}

export const ListPaymemtConcept = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectExp } = props
  const { getPayConcepts, listPayConcepts } = usePayConcepts()

  useEffect(() => {
    getPayConcepts({
      page: 1,
      concepto__icontains: query,
    })
  }, [])

  const dataList: ITypePayments[] = listPayConcepts?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      codigo: item.codigo,
      concepto: item.concepto,
      monto: item.monto,
    }
  })

  return (
    <>
      <TableCustom
        columns={columns}
        rows={rows}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        selectionMode="single"
        onSelectionChange={(selectedRow) => {
          onSelectExp(selectedRow)
        }}
      />
    </>
  )
}
