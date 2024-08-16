'use client'
import { useState } from 'react'
import { ILanguages, IResApi } from '@/types'
import { fetchGestor } from '@/api'
import { revalidatePath } from 'next/cache'

export const usePrograms = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPrograms, setListProrams] = useState<{
    count: number
    results: ILanguages[]
    next: string | null
    previous: string | null
  } | null>(null)

  const getLanguages = async () => {
    setLoading(true)
    const response = await fetchGestor('Programa/', { method: 'GET' }, {
      next: {
        caches: 'no-store',
      }
    })
    if (response.detail) {
      throw new Error('Error al cargar los idiomas')
    }
    const data: IResApi<ILanguages> = response as IResApi<ILanguages>
    setListProrams(data)
    setLoading(false)
  }

  return { listPrograms, getLanguages, loading }
}
