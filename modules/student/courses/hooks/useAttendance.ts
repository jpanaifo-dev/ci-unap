'use client'
import { useState } from 'react'
import { IAsistenciaFilter, IAsistenciaList, IResApi } from '@/types'
import { fetchAsistenciaList } from '@/api'

export const useAttendance = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listAttendaces, setListAttendances] =
    useState<IResApi<IAsistenciaList> | null>(null)

  const getAttendance = async (filter: IAsistenciaFilter) => {
    setLoading(true)

    try {
      const response = await fetchAsistenciaList(filter)

      if (response?.ok) {
        const data = await response.json()
        setListAttendances(data)
      }
    } catch (error) {
      console.error(error)
      setListAttendances(null)
    }

    setLoading(false)
  }

  return { loading, getAttendance, listAttendaces }
}
