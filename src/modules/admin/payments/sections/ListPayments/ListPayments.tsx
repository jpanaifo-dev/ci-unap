/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IPayments, IProceeding, IResApi } from '@/types'
import { TableCustom, IColumns, IRows, IActions } from '@/modules/admin'
import { usePayments } from '@/modules/admin'
import { useEffect, useState } from 'react'

const col: IColumns[] = [
  {
    key: 'operacion',
    label: 'N. de operación',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha de operación',
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
    key: 'documento',
    label: 'N. de documento',
    align: 'center',
  },
  {
    key: 'cliente',
    label: 'Cliente',
    align: 'center',
  },
  {
    key: 'expediente',
    label: 'Expediente',
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
  {
    label: 'Editar',
    href: '',
  },
]

export const ListPayments = () => {
  const { loading, getPayments, listPayments } = usePayments()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPayments({
      page,
      num_documento__icontains: query,
    })
  }, [page, query])

  const payments: IPayments[] = listPayments?.results || []

  const rows: IRows[] = payments?.map((item) => {
    return {
      key: String(item.id),
      operacion: item.num_operacion,
      fecha: item.fecha_operacion,
      concepto: item.concepto.concepto,
      monto: item.monto,
      documento: item.num_documento,
      cliente: item.nombre_cliente,
      expediente: renderColumnPerson(item.expediente),
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
        placeholder="Buscar pago por número de DNI"
        columns={col}
        rows={rows || []}
        actionsList={actions}
        loading={loading}
        searchValue={query}
        onSearch={handleSearch}
        pagination={{
          count: listPayments?.count || 0,
          page: page,
          rowsPerPage: 15,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}

const renderColumnPerson = (item: IProceeding) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm">{item?.persona?.nombres}</p>
      <div className="flex gap-1 items-center ">
        <p className="text-xs">{item?.persona?.apellido_paterno}</p>
        <p>{item?.persona?.apellido_materno}</p>
      </div>
    </div>
  )
}
