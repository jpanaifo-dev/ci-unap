/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IColumns, IRows, TableCustom } from '@/modules/admin'
import { HeaderPage, useStudetsForGroup } from '@/modules/teacher'
import { useParams } from 'next/navigation'
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
    key: 'correo',
    label: 'Correo',
    align: 'center',
  },
  {
    key: 'celular',
    label: 'Celular',
    align: 'center',
  },
]

export const ListStudents = () => {
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
        nombre: alumno?.nombre,
        apellidos: alumno?.apellidos,
        correo: alumno?.correo,
        celular: alumno?.celular,
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
      {data?.length > 0 && (
        <main className="w-full">
          <HeaderPage
            title="Listado de estudiantes"
            description="Esta es la lista de estudiantes que pertenecen al grupo seleccionado"
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
      )}
      {data?.length === 0 && loadingData === false && (
        <main className="flex flex-col items-center justify-center h-full sm:pt-14">
          <NotStudents />
        </main>
      )}
    </>
  )
}
