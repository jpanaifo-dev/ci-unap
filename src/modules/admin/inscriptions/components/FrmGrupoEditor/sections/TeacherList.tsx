/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableCustom, IColumns, IRows, useTeachers } from '@/modules/admin'
import { ITeach } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Nombre',
    align: 'center',
  },

  {
    key: 'apellidos',
    label: 'Apellidos',
    align: 'center',
  },
  {
    key: 'documento',
    label: 'Documento',
    align: 'center',
  },
]

interface IProps {
  onSelectTeacher: (person: IRows) => void
}

export const TeacherList = (props: IProps) => {
  const [query, setQuery] = useState('')

  const { onSelectTeacher } = props
  const { getTeachers, listTeachers, loading } = useTeachers()

  useEffect(() => {
    getTeachers({
      page: 1,
      persona__nombres__icontains: '',
      persona__apellido_materno__icontains: '',
      persona__apellido_paterno__icontains: '',
    })
  }, [query])

  const dataList: ITeach[] = listTeachers?.results ?? []

  const rows: IRows[] = dataList?.map((item: ITeach) => {
    return {
      key: item?.id,
      id: item?.id,
      nombre: item?.persona?.nombres,
      full_name:
        item?.persona?.nombres +
        ' ' +
        item?.persona?.apellido_paterno +
        ' ' +
        item?.persona?.apellido_materno,
      apellidos:
        item?.persona?.apellido_paterno + ' ' + item?.persona?.apellido_materno,
      documento: item?.persona?.numero_documento,
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
          onSelectTeacher(selected)
        }}
        loading={loading}
      />
    </>
  )
}
