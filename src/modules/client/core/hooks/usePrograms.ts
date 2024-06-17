'use client'
import { useState } from 'react'
import { ILanguages, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQPrograms {
  search: string
}

export const usePrograms = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPrograms, setListPrograms] = useState<IResApi<ILanguages> | null>(
    null
  )

  const getProgramsActive = async (query: IQPrograms) => {
    setLoading(true)
    const { search } = query
    const url = `Programa/?id=&is_active=true&nombre__icontains=${search}`
    const response = await fetchGestor(url, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<ILanguages> = response as IResApi<ILanguages>
    setListPrograms(data)
    setLoading(false)
  }

  return { getProgramsActive, listPrograms, loading }
}
