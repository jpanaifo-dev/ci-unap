/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IEnrollment, ILanguages, ILevel, IPerson } from '@/types'
import { TableCustom, IRows, useEnrollments, IActions } from '@/modules/admin'
import { col } from './columsData'
import { useFilterFromUrl } from '@/hooks'
import { TopContent } from './TopContent'

const actions: IActions[] = [
  {
    label: 'Editar',
    href: '',
  },
  {
    label: 'Detalles',
    href: '',
  },
]

export const ListEnrollments = () => {
  const { getEnrollments, listEnrollmetns, loading } = useEnrollments()
  const { getParams, updateFilter } = useFilterFromUrl()

  const query = getParams('query', '')
  const typeQuery = getParams('queryType', '')
  const page = Number(getParams('page', '1'))
  const program = getParams('program_id', '')
  const status = getParams('status', '')
  const date = getParams('date', '')

  useEffect(() => {
    getEnrollments({
      page,
      numero_documento: typeQuery === '' ? query : '',
      nombres: typeQuery === 'name' ? query : '',
      apellido_paterno: typeQuery === 'surnameP' ? query : '',
      apellido_materno: typeQuery === 'surnameM' ? query : '',
      programa_id: program,
      is_active: status,
      fecha: date,
    })
  }, [query, page, program, status, date])

  const tiposDocs: IEnrollment[] = listEnrollmetns?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      fecha: item?.fecha,
      alumno: renderColPerson(item?.expediente?.persona),
      programa: renderColProgram(item?.expediente?.programa),
      nivel: renderColLevel(item?.nivel),
      status: item?.is_active
        ? 'Activo'
        : item?.is_retired
        ? 'Retirado'
        : 'Inactivo',
      actions: 'actions',
    }
  })

  return (
    <>
      <TableCustom
        placeholder="Buscar matrícula por DNI"
        columns={col}
        rows={rows || []}
        actionsList={actions}
        loading={loading}
        pagination={{
          page,
          count: listEnrollmetns?.count || 0,
          rowsPerPage: 10,
          onChangePage: (page) => updateFilter('page', page.toString()),
        }}
        disableInputSearch
        topContent={<TopContent />}
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
