/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, useEnrollments } from '@/modules/admin'
import { IEnrollment, ILanguages, ILevel, IPerson } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha',
    align: 'center',
  },
  {
    key: 'alumn',
    label: 'Alumno',
    align: 'center',
  },
  {
    key: 'program',
    label: 'Programa',
    align: 'center',
  },
  {
    key: 'nivel',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
]

interface IProps {
  onSelectProgram: (person: IRows) => void
}

export const ListMatricula = (props: IProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { onSelectProgram } = props
  const { getEnrollments, listEnrollmetns, loading } = useEnrollments()

  useEffect(() => {
    getEnrollments({
      page,
      numero_documento: query,
      is_active: 'true',
    })
  }, [query, page])

  const dataList: IEnrollment[] = listEnrollmetns?.results ?? []

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      fecha: item?.fecha,
      alumn: renderColPerson(item?.expediente?.persona),
      expediente: item?.expediente,
      program: renderColProgram(item?.expediente?.programa),
      programa: item?.expediente?.programa
        ? item?.expediente?.programa?.nombre
        : '',
      nivel: renderColLevel(item?.nivel),
      status: item?.is_active
        ? 'Activo'
        : item?.is_retired
        ? 'Retirado'
        : 'Inactivo',
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
          page: page,
          count: listEnrollmetns?.count ?? 0,
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
