/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import { IModule } from '@/types'
import {
  TableCustom,
  useModules,
  IColumns,
  IRows,
  IActions,
} from '@/modules/admin'
import { CoursesFilter } from './CoursesFilter'
import { useFilterFromUrl } from '@/hooks'

const col: IColumns[] = [
  {
    key: 'id',
    label: 'Id-Cod',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Nombre del curso',
    align: 'center',
  },
  {
    key: 'program',
    label: 'Programa',
    align: 'center',
  },
  {
    key: 'level',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'modality',
    label: 'Modalidad',
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

export const ListCourses = () => {
  const { listModules: data, getModules, loading } = useModules()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { getParams } = useFilterFromUrl()

  const status = getParams('status', '')
  const program_id = getParams('program_id', '')
  const level = getParams('level', '')
  const modality = getParams('modality', '')

  useEffect(() => {
    getModules({
      page,
      name: query,
      nameModality: '',
      nameProgram: '',
      modalidad_id: modality,
      nivel_id: level,
      program_id: program_id,
      status: status,
    })
  }, [query, page, status, program_id, level, modality])

  const courses: IModule[] = data?.results || []
  const rows: IRows[] = courses?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.nombre,
      program: item?.modalidad?.programa?.nombre,
      level: item.nivel.nombre,
      modality: item.modalidad.nombre,
      status: item.is_active,
      actions: 'actions',
    }
  })

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <>
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        <TableCustom
          placeholder="Buscar curso por nombre"
          columns={col}
          actionsList={actions}
          rows={rows || []}
          searchValue={query}
          onSearch={handleSearch}
          loading={loading}
          pagination={{
            count: data?.count || 0,
            page: page,
            rowsPerPage: 15,
            onChangePage: (newPage: number) => setPage(newPage),
          }}
          topContent={<CoursesFilter />}
        />
      </Suspense>
    </>
  )
}
