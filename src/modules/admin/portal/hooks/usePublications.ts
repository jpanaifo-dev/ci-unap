'use client'
import { useState } from 'react'
import { IPublication, IResApi } from '@/types'
import { fetchCore } from '@/api'

interface IQuery {
  page?: number
  name?: string
}

export const usePublications = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublications, setListPublications] =
    useState<IResApi<IPublication> | null>(null)

  const getPublications = async (query: IQuery) => {
    setLoading(true)
    const { page, name } = query

    const path = `portal/PublicacionList/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<IPublication> =
      (await response.json()) as IResApi<IPublication>

    setListPublications(data)
    setLoading(false)
  }

  return { loading, getPublications, listPublications }
}
