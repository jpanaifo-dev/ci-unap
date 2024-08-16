/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, usePersons } from '@/modules/admin'
import { IPerson } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'nombres',
    label: 'Nombre',
    align: 'center',
  },
  {
    key: 'apellido_paterno',
    label: 'Apellido Paterno',
    align: 'center',
  },
  {
    key: 'apellido_materno',
    label: 'Apellido Materno',
    align: 'center',
  },
  {
    key: 'numberDoc',
    label: 'N. Documento',
    align: 'center',
  },
]

interface IProps {
  onSelectPerson: (person: IRows) => void
}

export const ListPersons = (props: IProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { onSelectPerson } = props
  const { getPersons, listPersons } = usePersons()

  useEffect(() => {
    getPersons({
      page,
      numero_documento__icontains: query,
    })
  }, [page, query])

  const dataList: IPerson[] = listPersons?.results ?? []

  const rows: IRows[] = dataList.map((item) => {
    return {
      key: item.id,
      id: item.id,
      nombres: item.nombres,
      apellido_paterno: item.apellido_paterno,
      apellido_materno: item.apellido_materno,
      numberDoc: item.numero_documento,
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
          onSelectPerson(selectedRow)
        }}
        pagination={{
          page,
          count: listPersons?.count || 0,
          onChangePage(newPage) {
            setPage(newPage)
          },
        }}
      />
    </>
  )
}
