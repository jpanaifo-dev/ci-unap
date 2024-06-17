'use client'
import { useState } from 'react'
import { IPublicationType, IResApi } from '@/types'
import { fetchCore } from '@/api'
interface IQuery {
  page?: number
  name?: string
}

export const usePublicationsTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsType, setListPublicationsType] =
    useState<IResApi<IPublicationType> | null>(null)

  const getPublicationsTypes = async (props: IQuery) => {
    setLoading(true)
    const { page, name } = props

    const path = `portal/PublicacionTipo/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los tipos de publicacion')
    }

    const data: IResApi<IPublicationType> =
      (await response.json()) as IResApi<IPublicationType>

    setListPublicationsType(data)
    setLoading(false)
  }

  return { loading, listPublicationsType, getPublicationsTypes }
}
