'use client'
import { useState } from 'react'
import { IGroupData, IResCookie } from '@/types'
import { fetchGestor } from '@/api'
import { getCookie } from '@/utils'

const APP_NAME = process.env.APP_NAME || ''

interface IQuery {
  group_id: string
}

export const useStudetsForGroup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<IGroupData | null>(null)

  const getGroupData = async (query: IQuery) => {
    setLoading(true)
    const { group_id } = query
    const resCookie: IResCookie = (await getCookie(
      `${APP_NAME}_persona_id`
    )) as IResCookie

    const id_persona = resCookie.value

    const response = await fetchGestor(
      `get_alumnos_grupo/?persona_id=${id_persona}&grupo_id=${group_id}`,
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
