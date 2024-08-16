/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import {
  TableCustom,
  IActions,
  IColumns,
  IRows,
  usePersons,
} from '@/modules/admin'
import { IPerson } from '@/types'
import { TopContent } from './TopContent'
import { useFilterFromUrl } from '@/hooks'

const col: IColumns[] = [
  {
    key: 'doc',
    label: 'N. de documento',
    align: 'center',
  },
  {
    key: 'person',
    label: 'Persona',
    align: 'center',
  },
  {
    key: 'dateBirth',
    label: 'F. de nacimiento',
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

const actionsList: IActions[] = [
  {
    label: 'Editar',
    href: '/admin/personas/',
  },
  {
    label: 'Detalles',
    href: '',
  },
  {
    label: 'Restablecer contraseña',
    href: 'reset-password',
  },
]

export const ListPersons = () => {
  const { listPersons: data, getPersons, loading } = usePersons()
  const { getParams, updateFilter } = useFilterFromUrl()

  const queryType = getParams('queryType', '')
  const query = getParams('query', '')
  const page = Number(getParams('page', '')) || 1

  useEffect(() => {
    getPersons({
      page,
      numero_documento__icontains: queryType === '' ? query : '',
      nombres__icontains: queryType === 'name' ? query : '',
      apellido_paterno__icontains: queryType === 'surnameP' ? query : '',
      apellido_materno__icontains: queryType === 'surnameM' ? query : '',
    })
  }, [query, page, queryType])

  const courser = data?.results || []

  const rows: IRows[] = courser?.map((item) => {
    return {
      key: item.id,
      person: renderColumnPerson(item),
      doc: item.numero_documento,
      dateBirth: item.fecha_nacimiento,
      email: item.correo,
      phone: item.celular,
      actions: 'actions',
    }
  })

  const handlePage = (value: number) => {
    if (value === 1) {
      updateFilter('page', '')
      return
    }
    updateFilter('page', String(value))
  }

  return (
    <main className="flex flex-col gap-3">
      <TableCustom
        placeholder="Buscar persona por DNI"
        columns={col}
        rows={rows || []}
        actionsList={actionsList}
        loading={loading}
        pagination={{
          page,
          count: data?.count || 0,
          rowsPerPage: 10,
          onChangePage(newPage) {
            handlePage(newPage)
          },
        }}
        disableInputSearch
        topContent={<TopContent />}
      />
    </main>
  )
}

const renderColumnPerson = (item: IPerson) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm">{item.nombres}</p>
      <div className="flex gap-1 items-center ">
        <p className="text-xs">{item.apellido_paterno}</p>
        <p>{item.apellido_materno}</p>
      </div>
    </div>
  )
}
