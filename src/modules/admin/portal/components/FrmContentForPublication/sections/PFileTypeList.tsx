/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, useProceedings } from '@/modules/admin'

import { IProceeding } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'persona',
    label: 'Persona',
    align: 'center',
  },
  {
    key: 'programa',
    label: 'Programa',
    align: 'center',
  },
  {
    key: 'descuento',
    label: 'Descuento',
    align: 'center',
  },
]

interface IProps {
  onSelectExp: (person: IRows) => void
}

export const ListExpedientes = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectExp } = props
  const { getExpedientes, listProceedings } = useProceedings()

  useEffect(() => {
    getExpedientes({
      page: 1,
    })
  }, [])

  const dataList: IProceeding[] = listProceedings?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      persona:
        item.persona.nombres +
        ' ' +
        item.persona.apellido_paterno +
        ' ' +
        item.persona.apellido_materno,
      programa: item.programa.nombre,
      descuento: item.descuento?.descripcion || 'Sin descuento',
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
