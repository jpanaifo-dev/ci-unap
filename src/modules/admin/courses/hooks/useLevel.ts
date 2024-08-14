'use client'
import { useState } from 'react'
import { ILevel, IResApi } from '@/types'
import { fetchGestor } from '@/api'

export const useLevels = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listLevels, setListLevels] = useState<{
    count: number
    next: string | null
    previous: string | null
    results: ILevel[]
  } | null>(null)

  const getLevels = async () => {
    setLoading(true)
    const response = await fetchGestor('Nivel/', { method: 'GET' })

    if (response.detail) {
      throw new Error('Error al cargar los niveles')
    }
    const data: IResApi<ILevel> = response as IResApi<ILevel>
    setListLevels(data)
    setLoading(false)
  }

  return { listLevels, getLevels, loading }
}
