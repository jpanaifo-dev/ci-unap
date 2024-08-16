'use client'
import { useState } from 'react'
import { fetchGestor } from '@/api'
import { ICivilStatus, IResApi } from '@/types'

export const useCivilStatus = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listStatus, setlistStatus] = useState<{
    count: number
    results: ICivilStatus[]
  } | null>(null)

  const getCivilStatus = async () => {
    setLoading(true)
    const response = await fetchGestor('EstadoCivil/', { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar los tipos de documento')
    }

    const data: IResApi<ICivilStatus> = response as IResApi<ICivilStatus>
    setlistStatus(data)
    setLoading(false)
  }

  return {
    getCivilStatus,
    listStatus,
    loading,
  }
}
