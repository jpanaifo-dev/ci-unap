/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, useGroups } from '@/modules/admin'
import { IGroup, IInscriptions } from '@/types'
import { useFormContext } from 'react-hook-form'

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
    key: 'teacher',
    label: 'Docente',
    align: 'center',
  },
  {
    key: 'fecha_inicio',
    label: 'Fecha Inicio',
    align: 'center',
  },
  {
    key: 'fecha_final',
    label: 'Fecha Fin',
    align: 'center',
  },
  {
    key: 'resolucion',
    label: 'N° de Resolución',
    align: 'center',
  },
]

interface IProps {
  onSelectProgram: (person: IRows) => void
}

export const ListGroup = (props: IProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { watch } = useFormContext<IInscriptions>()

  const { onSelectProgram } = props
  const { getGroups, listGroups, loading } = useGroups()

  const matricula = watch('matricula')
  const nivel = matricula?.nivel

  useEffect(() => {
    if (matricula) {
      getGroups({
        page,
        name_modulo: query,
        nivel_id: nivel?.id,
      })
    }
  }, [query, page, matricula])

  const dataList: IGroup[] = listGroups?.results ?? []

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      grupo: 'Grupo ' + item?.grupo,
      curso: item?.modulo?.nombre,
      fecha_inicio: item?.fecha_inicio,
      fecha_final: item?.fecha_final,
      resolucion: item?.resolucion,
      modulo: item?.modulo,
      aforo: item?.aforo,
      teacher:
        item?.docente?.persona?.nombres +
        ' ' +
        item?.docente?.persona?.apellido_paterno +
        ' ' +
        item?.docente?.persona?.apellido_materno,
      docente: item?.docente,
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
