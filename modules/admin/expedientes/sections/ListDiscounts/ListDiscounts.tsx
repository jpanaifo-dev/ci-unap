/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IDiscount } from '@/types'
import { usePathname } from 'next/navigation'

import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  useDiscounts,
} from '@/modules/admin'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'descripcion',
    label: 'Concepto de descuento',
    align: 'center',
  },
  {
    key: 'porcentaje',
    label: 'Porcentaje (%)',
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

export const ListDiscounts = () => {
  const { getDiscounts, listDiscounts, loading } = useDiscounts()
  const pathname = usePathname()
  const isDiscount = pathname === '/admin/expedientes/descuentos'

  useEffect(() => {
    if (isDiscount) {
      getDiscounts()
    }
  }, [isDiscount])

  const tiposDocs: IDiscount[] = listDiscounts?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      descripcion: item?.descripcion,
      porcentaje: item?.porcentaje,
      status: item?.is_active,
      actions: 'actions',
    }
  })

  return (
    <>
      <section>
        <TableCustom
          disableInputSearch
          columns={col}
          rows={rows || []}
          actionsList={actions}
          loading={loading}
        />
      </section>
    </>
  )
}
