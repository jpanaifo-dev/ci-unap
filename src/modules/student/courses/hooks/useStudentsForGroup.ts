'use client'
import { useState } from 'react'
import { IGroupData } from '@/types'
import { fetchGestor } from '@/api'

interface IQuery {
  group_id: string
  id_docente: string
}

export const useStudetsForGroup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<IGroupData | null>(null)

  const getGroupData = async (query: IQuery) => {
    setLoading(true)
    const { group_id, id_docente } = query

    const response = await fetchGestor(
      `get_alumnos_grupo/?docente_id=${id_docente}&grupo_id=${group_id}`,
      { method: 'GET' }
    )

    if (response?.detail) {
      throw new Error('Error al cargar los grupos')
    }

    const data: IGroupData = response as IGroupData
    setGroupData(data)
    setLoading(false)
  }

  return { loading, getGroupData, groupData }
}
