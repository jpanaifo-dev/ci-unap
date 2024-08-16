/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IColumns, IRows, TableCustom } from '@/modules/admin'
import { HeaderPage, useStudetsForGroup } from '@/modules/teacher'
import { useParams, useSearchParams } from 'next/navigation'
import { RenderActionColum } from './RenderActionColum'
import { NotStudents } from '@/modules/core'

const col: IColumns[] = [
  {
    key: 'num',
    label: '#',
    align: 'center',
  },
  {
    key: 'numero_documento',
    label: 'N° Documento',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Nombres',
    align: 'center',
  },
  {
    key: 'apellidos',
    label: 'Apellidos',
    align: 'center',
  },
  {
    key: 'nota1',
    label: 'Nota medio curso',
    align: 'center',
  },
  {
    key: 'nota2',
    label: 'Nota final',
    align: 'center',
  },
  {
    key: 'scoreEnd',
    label: 'Nota final',
    align: 'center',
  },
  {
    key: 'addScore',
    label: 'Agregar nota',
    align: 'center',
  },
]

export const StudentsScore = () => {
  const [query, setQuery] = useState('')

  const { groupData, loading, getGroupData } = useStudetsForGroup()
  const { id } = useParams()
  const searchParams = useSearchParams()

  const score_id = searchParams.get('score_id')

  useEffect(() => {
    getGroupData({ group_id: String(id) })
  }, [score_id])

  const data: IRows[] = groupData
    ? groupData?.alumnos.map((alumno, i) => ({
        key: alumno?.id,
        num: i + 1,
        numero_documento: alumno?.numero_documento,
        nombre: alumno?.nombre,
        apellidos: alumno?.apellidos,
        nota1: alumno?.nota1 || 'No registrado',
        nota2: alumno?.nota2 || 'No registrado',
        scoreEnd: alumno?.promedio || 'No registrado',
        addScore: (
          <RenderActionColum
            inscription_id={alumno?.inscripcion_id.toString()}
          />
        ),
      }))
    : []

  const loadingData = loading || !groupData

  const listFiltered: IRows[] = data.filter((item) => {
    const nombre = item?.nombre?.toString() || ''
    const apellidos = item?.apellidos?.toString() || ''
    const numero_documento = item?.numero_documento?.toString() || ''

    return (
      nombre.toLowerCase().includes(query.toLowerCase()) ||
      apellidos.toLowerCase().includes(query.toLowerCase()) ||
      numero_documento.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <>
      {data.length > 0 ? (
        <main className="w-full">
          <HeaderPage
            title="Calificaciones de estudiantes"
            description=" Listado de calificaciones de estudiantes del grupo. (*) Nota final:
      Promedio de las notas de medio curso y final."
          />
          <TableCustom
            columns={col}
            rows={listFiltered}
            loading={loadingData}
            onSearch={(value) => setQuery(value)}
            searchValue={query}
          />
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center h-full sm:pt-14">
          <NotStudents />
        </main>
      )}
    </>
  )
}
