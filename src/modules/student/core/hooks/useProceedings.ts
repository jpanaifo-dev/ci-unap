'use client'
import { useState } from 'react'
import { IProceedingFilter, IProceedingList, IResApi } from '@/types'
import { fetchExpedienteList } from '@/api'
import { getPersonId } from '@/libs'

export const useStudentsProceeding = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [proceedings, setProceedings] =
    useState<IResApi<IProceedingList> | null>(null)

  const getProceedings = async (filters: IProceedingFilter) => {
    setLoading(true)

    const id_persona = await getPersonId()
    try {
      const response = await fetchExpedienteList({
        ...filters,
        persona__id: id_persona,
      })

      if (response?.ok) {
        const data: IResApi<IProceedingList> = await response.json()
        setProceedings(data)
      }
    } catch (error) {
      console.error(error)
      setProceedings(null)
    } finally {
      setLoading(false)
    }
  }

  return { proceedings, getProceedings, loading }
}
