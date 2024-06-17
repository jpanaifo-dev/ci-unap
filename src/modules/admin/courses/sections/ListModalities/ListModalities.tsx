/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense, useState } from 'react'
import { IModality } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  TableCustom,
  IColumns,
  IRows,
  useModalities,
  IActions,
} from '@/modules/admin'
import { ModalitiesFilter } from './ModalitiesFilter'

const col: IColumns[] = [
  {
    key: 'id',
    label: 'Id-Cod',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Modalidad',
    align: 'center',
  },
  {
    key: 'programa',
    label: 'Programa',
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
    href: '',
    label: 'Editar',
  },
]

export const ListModalities = () => {
  const [query, setQuery] = useState('')
  const { listModalities: data, getModalities, loading } = useModalities()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isModality = pathname === '/admin/idiomas/modalidades'
  const programId = searchParams.get('program_id') || ''
  const status = searchParams.get('status') || ''

  useEffect(() => {
    if (isModality) {
      getModalities({
        name: query,
        program_id: programId,
        status: status,
      })
    }
  }, [isModality, query, programId, status])

  const modalities: IModality[] = data?.results || []
  const rows: IRows[] = modalities?.map((item) => {
    return {
      key: item.id,
      id: item?.id,
      name: item?.nombre,
      programa: item?.programa?.nombre,
      status: item?.is_active,
      actions: 'actions',
    }
  })

  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TableCustom
          placeholder="Buscar modalidad"
          columns={col}
          rows={rows || []}
          searchValue={query}
          onSearch={handleSearch}
          loading={loading}
          actionsList={actions}
          topContent={<ModalitiesFilter />}
        />
      </Suspense>
    </>
  )
}
