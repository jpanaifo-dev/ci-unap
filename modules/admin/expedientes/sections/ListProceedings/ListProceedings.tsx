/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense } from 'react'
import { TableCustom, IRows, useProceedings, IActions } from '@/modules/admin'
import { IProceeding } from '@/types'
import { col } from './columsData'
import { useFilterFromUrl } from '@/hooks'
import { TopContent } from './TopContent'

const actions: IActions[] = [
  { label: 'Editar', href: 'admin/expedientes/editar' },
  { label: 'Detalles', href: '' },
  { label: 'Detalles económico', href: 'economico' },
  { label: 'Detalles académico', href: 'academico' },
]

export const ListProceeding = () => {
  const { listProceedings: data, getExpedientes, loading } = useProceedings()
  const { getParams, updateFilter } = useFilterFromUrl()

  const page = Number(getParams('page', '1'))
  const query = getParams('query', '')
  const queryType = getParams('queryType', '')
  const programId = getParams('program_id', '')
  const status = getParams('status', '')

  useEffect(() => {
    getExpedientes({
      page,
      persona_numero_documento: queryType === '' ? query : '',
      persona_nombres: queryType === 'name' ? query : '',
      persona_apellido_paterno: queryType === 'surnameP' ? query : '',
      persona_apellido_materno: queryType === 'surnameM' ? query : '',
      programa_id: programId,
      status,
    })
  }, [query, page, status, programId])

  const proceedings: IProceeding[] = data?.results || []

  const rows: IRows[] = proceedings?.map((item) => {
    return {
      key: item.id,
      person: renderColumnPerson(item),
      doc: item.persona.numero_documento,
      email: item.persona.correo,
      program: item.programa.nombre,
      situation: !item.is_active
        ? 'Inactivo'
        : item?.is_retirate
        ? 'Retirado'
        : item?.is_graduated
        ? 'Graduado'
        : 'Activo',
      actions: 'actions',
    }
  })

  return (
    <main className="flex flex-col gap-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <TableCustom
          placeholder="Buscar por número de DNI"
          columns={col}
          rows={rows || []}
          actionsList={actions}
          loading={loading}
          pagination={{
            page,
            count: data?.count || 0,
            rowsPerPage: 15,
            onChangePage: (newPage: number) =>
              updateFilter('page', newPage.toString()),
          }}
          disableInputSearch
          topContent={<TopContent />}
        />
      </Suspense>
    </main>
  )
}

const renderColumnPerson = (item: IProceeding) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm">{item?.persona?.nombres}</p>
      <div className="flex gap-1 items-center ">
        <p className="text-xs">{item?.persona?.apellido_paterno}</p>
        <p>{item?.persona?.apellido_materno}</p>
      </div>
    </div>
  )
}
