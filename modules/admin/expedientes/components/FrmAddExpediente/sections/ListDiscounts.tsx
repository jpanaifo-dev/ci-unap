/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  IActions,
  IColumns,
  IRows,
  TableCustom,
  useDiscounts,
} from '@/modules/admin'
import { IDiscount } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'descripcion',
    label: 'Descripcion',
    align: 'center',
  },
  {
    key: 'porcentaje',
    label: '% descuento',
    align: 'center',
  },
]

const actions: IActions[] = [
  { label: 'Editar', href: 'admin/expedientes/decuentos' },
]

interface IProps {
  onSelectDiscount: (person: IRows) => void
}

export const ListDiscounts = (props: IProps) => {
  const { onSelectDiscount } = props
  const [query, setQuery] = useState<string>('')

  const { getDiscounts, listDiscounts } = useDiscounts()

  useEffect(() => {
    getDiscounts()
  }, [query])

  const data: IDiscount[] = listDiscounts?.results ?? []
  const rows: IRows[] = data?.map((item) => ({
    key: item.id,
    id: item.id,
    descripcion: item.descripcion,
    porcentaje: item.porcentaje,
  }))

  return (
    <>
      <TableCustom
        columns={columns}
        rows={rows || []}
        searchValue={query}
        onSearch={(value) => setQuery(value)}
        actionsList={actions}
        selectionMode="single"
        onSelectionChange={(selectedRow) => {
          onSelectDiscount(selectedRow)
        }}
      />
    </>
  )
}
