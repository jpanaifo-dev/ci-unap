'use client'
import { useState } from 'react'
import { IResApi } from '@/types'
import { fetchGestor } from '@/api'
import { IAsistencia } from '@/types'

const id_docente = 1

interface IQuery {
  inscripcion__id?: string
  inscripcion__grupo__id?: string
  inscripcion__matricula__id?: string
  inscripcion__matricula__expediente__id?: string
}

export const useAttendance = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listAttendaces, setListAttendances] =
    useState<IResApi<IAsistencia> | null>(null)

  const getAttendance = async (query: IQuery) => {
    const {
      inscripcion__grupo__id = '',
      inscripcion__id = '',
      inscripcion__matricula__id = '',
      inscripcion__matricula__expediente__id = '',
    } = query
    setLoading(true)

    const response = await fetchGestor(
      `Asistencia/?inscripcion__id=${inscripcion__id}&inscripcion__grupo__id=${inscripcion__grupo__id}1&inscripcion__matricula__id=${inscripcion__matricula__id}&inscripcion__matricula__expediente__id=${inscripcion__matricula__expediente__id}`,
      { method: 'GET' }
    )

    if (response?.detail) {
      throw new Error('Error al cargar los grupos')
    }

    const data: IResApi<IAsistencia> = response as IResApi<IAsistencia>
    setListAttendances(data)
    setLoading(false)
  }

  return { loading, getAttendance, listAttendaces }
}
