'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { IColumns, IRows, TableCustom } from '@/modules/admin'
import { HeaderPage, useStudetsForGroup } from '@/modules/teacher'
import { useParams } from 'next/navigation'
import { RenderActionColum } from './RenderActionColum'

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
    key: 'alumno',
    label: 'Alumno',
    align: 'center',
  },
  {
    key: 'asistencias',
    label: 'Asistencias',
    align: 'center',
  },
  {
    key: 'faltas',
    label: 'Faltas',
    align: 'center',
  },
  {
    key: 'justificadas',
    label: 'Justificadas',
    align: 'center',
  },
  {
    key: 'assign',
    label: 'Asistencia',
    align: 'center',
  },
]

export const StudentsAsistencia = () => {
  const { groupData, loading, getGroupData } = useStudetsForGroup()
  const { id } = useParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getGroupData({ group_id: String(id) })
  }, [])

  const data: IRows[] = groupData
    ? groupData?.alumnos.map((alumno, i) => ({
        key: alumno?.id,
        num: i + 1,
        numero_documento: alumno?.numero_documento,
        alumno: `${alumno?.nombre} ${alumno?.apellidos}`,
        asistencias: '',
        faltas: '',
        justificadas: '',
        assign: (
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
      <main className="w-full">
        <HeaderPage
          title="Listado de estudiantes"
          description="Esta es la lista de estudiantes que pertenecen al grupo seleccionado. Puedes registrar la asistencia de cada uno de ellos. Recuerda que una vez registrado, no podrás modificarlo."
          isDownload
          labelButton="Descargar lista"
        />
        <section>
          <TableCustom
            columns={col}
            rows={listFiltered}
            loading={loadingData}
            onSearch={(value) => setQuery(value)}
            searchValue={query}
          />
        </section>
      </main>
    </>
  )
}
