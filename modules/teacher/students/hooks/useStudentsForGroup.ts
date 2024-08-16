'use client'
import { useState } from 'react'
import { IGroupData } from '@/types'

import { fetchAlumnosGrupo } from '@/api'
import { getPersonId } from '@/libs'

interface IQuery {
  group_id: string
}

export const useStudetsForGroup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<IGroupData | null>(null)

  const getGroupData = async (query: IQuery) => {
    setLoading(true)
    const { group_id } = query
    const persona_id = await getPersonId()

    try {
      const res = await fetchAlumnosGrupo({
        persona_id: persona_id,
        group_id: group_id,
      })

      if (res.ok) {
        const data = await res.json()
        setGroupData(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  return { loading, getGroupData, groupData }
}

// const response = await fetchGestor(
//   `get_alumnos_grupo/?persona_id=${persona_id}&grupo_id=${group_id}`,
//   { method: 'GET' }
// )

// if (response?.detail) {
//   throw new Error('Error al cargar los grupos')
// }

// const data: IGroupData = response as IGroupData
// setGroupData(data)
