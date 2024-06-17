'use client'
import { useState } from 'react'
import { IPublicationFileType, IResApi } from '@/types'
import { fetchCore } from '@/api'
interface IQuery {
  page?: number
  name?: string
}

export const usePublicationsFilesTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsFileType, setListPublicationsFileType] =
    useState<IResApi<IPublicationFileType> | null>(null)

  const getPublicationsFilesTypes = async (props: IQuery) => {
    setLoading(true)
    const { page, name } = props

    const path = `portal/PublicacionTipoFile/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los tipos de publicacion')
    }

    const data: IResApi<IPublicationFileType> =
      (await response.json()) as IResApi<IPublicationFileType>

    setListPublicationsFileType(data)
    setLoading(false)
  }

  return { loading, listPublicationsFileType, getPublicationsFilesTypes }
}
