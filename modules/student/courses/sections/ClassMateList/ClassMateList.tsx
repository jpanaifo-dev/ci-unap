/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IColumns, IRows, TableCustom } from '@/modules/admin'
import { useStudetsForGroup } from '@/modules/student'
import { useParams } from 'next/navigation'
import { IGroupList } from '@/types'

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

interface IProps {
  group?: IGroupList
}

export const ClassMateList = (props: IProps) => {
  const { groupData, loading, getGroupData } = useStudetsForGroup()
  const { id } = useParams()
  const { group } = props
  const teacherPersonId = group?.docente?.persona?.id || ''

  useEffect(() => {
    getGroupData({ group_id: String(id), persona_id: String(teacherPersonId) })
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

  return (
    <>
      <section className="pb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Listado de participantes del grupo
        </h1>
        <p className="text-xs text-gray-500">
          Esta es la lista de estudiantes que pertenecen al grupo seleccionado
        </p>
      </section>
      <section>
        <TableCustom
          columns={col}
          rows={data}
          loading={loadingData}
          disableInputSearch
        />
      </section>
    </>
  )
}
