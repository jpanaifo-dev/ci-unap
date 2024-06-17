/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  TableCustom,
  IColumns,
  IRows,
  useEnrollments,
  useGroups,
} from '@/modules/admin'
import { IGroup, ILanguages, ILevel, IPerson } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'grupo',
    label: 'Grupo',
    align: 'center',
  },
  {
    key: 'curso',
    label: 'Programa',
    align: 'center',
  },
  {
    key: 'docente',
    label: 'Docente',
    align: 'center',
  },
]

interface IProps {
  onSelectProgram: (person: IRows) => void
}

export const ListGroup = (props: IProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { onSelectProgram } = props
  const { getGroups, listGroups, loading } = useGroups()

  useEffect(() => {
    getGroups({
      page,
      name_modulo: query,
    })
  }, [query, page])

  const dataList: IGroup[] = listGroups?.results ?? []

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      grupo: 'Grupo ' + item?.grupo,
      curso: item?.modulo?.nombre,
      docente:
        item?.docente?.persona?.nombres +
        ' ' +
        item?.docente?.persona?.apellido_paterno +
        ' ' +
        item?.docente?.persona?.apellido_materno,
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
        loading={loading}
        pagination={{
          count: listGroups?.count || 0,
          page,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}

function renderColPerson(item: IPerson) {
  return (
    <>
      <div>
        <h2>
          {item?.nombres} {item?.apellido_paterno} {item?.apellido_materno}
        </h2>
        <p className="text-xs text-gray-500">
          {item?.tipo_documento?.documento}: {item?.numero_documento}
        </p>
      </div>
    </>
  )
}

function renderColProgram(item: ILanguages) {
  return (
    <>
      {item?.codigo} - {item?.nombre}
    </>
  )
}

function renderColLevel(item: ILevel | string) {
  if (typeof item === 'string') {
    return <>{item}</>
  }
  return <>{item?.nombre}</>
}
