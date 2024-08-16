/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, usePrograms } from '@/modules/admin'
import { ILanguages } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'codigo',
    label: 'codigo',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Nombre',
    align: 'center',
  },
]

interface IProps {
  onSelectProgram: (person: IRows) => void
}

export const ListPrograms = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectProgram } = props
  const { getLanguages, listPrograms } = usePrograms()

  useEffect(() => {
    getLanguages()
  }, [query])

  const dataList: ILanguages[] = listPrograms?.results ?? []

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      nombre: item.nombre,
      codigo: item.codigo,
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
        onSelectionChange={(selected) => {
          onSelectProgram(selected)
        }}
      />
    </>
  )
}
