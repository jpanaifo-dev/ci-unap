'use client'
import { useState } from 'react'
import { IPublicationFile, IResApi } from '@/types'
import { fetchCore } from '@/api'

interface IQuery {
  page?: number
  name?: string
}

export const usePublicationsFile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsFiles, setListPublicationsFiles] =
    useState<IResApi<IPublicationFile> | null>(null)

  const getPublicationsFile = async (query: IQuery) => {
    setLoading(true)
    const { page, name } = query

    const path = `portal/PublicacionFileList/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<IPublicationFile> =
      (await response.json()) as IResApi<IPublicationFile>

    setListPublicationsFiles(data)
    setLoading(false)
  }

  return { loading, getPublicationsFile, listPublicationsFiles }
}
