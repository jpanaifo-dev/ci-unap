/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense, useState } from 'react'
import { IModality, ITeach } from '@/types'
import { usePathname } from 'next/navigation'
import { TableCustom, IColumns, IRows, useTeachers } from '@/modules/admin'

const col: IColumns[] = [
  {
    key: 'id',
    label: 'Id-Cod',
    align: 'center',
  },
  {
    key: 'grade',
    label: 'Grado académico',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Docente',
    align: 'center',
  },
  {
    key: 'email',
    label: 'Correo',
    align: 'center',
  },
  {
    key: 'phone',
    label: 'Celular',
    align: 'center',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]

export const ListTeachers = () => {
  const { getTeachers, listTeachers, loading } = useTeachers()
  const pathname = usePathname()
  const isTeacher = pathname === '/admin/cursos/docentes'
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isTeacher) {
      getTeachers({
        page,
        persona__nombres__icontains: query,
        persona__apellido_materno__icontains: '',
        persona__apellido_paterno__icontains: '',
      })
    }
  }, [page, query, isTeacher])

  const teachers: ITeach[] = listTeachers?.results || []
  const rows: IRows[] = teachers?.map((item) => {
    return {
      key: item.id,
      id: item?.id,
      grade: item?.grado_academico,
      name:
        item?.persona?.nombres +
        ' ' +
        item?.persona?.apellido_paterno +
        ' ' +
        item?.persona?.apellido_materno,
      email: item?.persona?.correo,
      phone: item?.persona?.celular,
      actions: 'actions',
    }
  })

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <>
      <Suspense>
        <TableCustom
          placeholder="Buscar docente por nombre"
          columns={col}
          rows={rows || []}
          searchValue={query}
          onSearch={handleSearch}
          loading={loading}
          pagination={{
            count: listTeachers?.count || 0,
            page: page,
            rowsPerPage: 15,
            onChangePage: (newPage: number) => setPage(newPage),
          }}
        />
      </Suspense>
    </>
  )
}
