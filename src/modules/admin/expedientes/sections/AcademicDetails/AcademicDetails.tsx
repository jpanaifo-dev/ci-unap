/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableCustom, IColumns, IRows } from '@/modules/admin'
import { IInscriptions, IResApi } from '@/types'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'fechaMatricula',
    label: 'Fecha de matricula',
    align: 'center',
  },
  {
    key: 'programa',
    label: 'Programa',
    align: 'center',
  },
  {
    key: 'grupo',
    label: 'Grupo',
    align: 'center',
  },
  {
    key: 'curso',
    label: 'Curso',
    align: 'center',
  },
  {
    key: 'nivel',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'modality',
    label: 'Modalidad',
    align: 'center',
  },
  {
    key: 'statusMatricula',
    label: 'Estado de matricula',
    align: 'center',
  },
  {
    key: 'score',
    label: 'Promedio',
    align: 'center',
  },
]

interface IProps {
  inscriptions: IResApi<IInscriptions>
}

export const AcademicDetails = (props: IProps) => {
  const { inscriptions } = props

  const listPayments: IInscriptions[] = inscriptions?.results || []

  const rows: IRows[] = listPayments?.map((item) => {
    return {
      key: item.id,
      fechaMatricula: item.matricula?.fecha,
      programa: item.matricula?.expediente?.programa?.nombre,
      grupo: item.grupo?.grupo,
      curso: item.grupo?.modulo?.nombre,
      nivel: item.grupo?.modulo?.nivel?.nombre,
      modality: item.grupo?.modulo?.modalidad?.nombre,
      statusMatricula: item.is_retired ? 'Retirado' : 'Activo',
      score: item.promedio,
    }
  })

  return (
    <main className="flex flex-col gap-3">
      <header>
        <h1 className="text-gray-500 font-bold">
          Detalles de los modulos inscritos
        </h1>
      </header>
      <TableCustom
        columns={col}
        rows={rows || []}
        // pagination={{
        //   count: payments?.count || 0,
        // //   page: payments?.page || 1,
        // }}
      />
    </main>
  )
}
