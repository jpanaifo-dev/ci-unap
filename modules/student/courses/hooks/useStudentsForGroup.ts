'use client'
import { useState } from 'react'
import { IGroupData, IGroupDataFilter } from '@/types'
import { fetchAlumnosGrupo } from '@/api'
import { getPersonId } from '@/libs'

export const useStudetsForGroup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<IGroupData | null>(null)

  const getGroupData = async (query: IGroupDataFilter) => {
    setLoading(true)

    const persona_id = await getPersonId()

    try {
      const response = await fetchAlumnosGrupo(query)

      if (response?.ok) {
        const data = await response.json()
        setGroupData(data)
      } else {
        setGroupData(null)
      }
    } catch (error) {
      setGroupData(null)
    }

    setLoading(false)
  }

  return { loading, getGroupData, groupData }
}
