'use client'
import { useState } from 'react'
import { IPortalFile, IResApi } from '@/types'
import { fetchCore } from '@/api'

interface IQuery {
  page?: number
  name?: string
}

export const useFiles = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listFiles, setListFiles] = useState<IResApi<IPortalFile> | null>(null)

  const getPortalFiles = async (query: IQuery) => {
    setLoading(true)
    const { page, name } = query

    const path = `portal/FileList/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<IPortalFile> =
      (await response.json()) as IResApi<IPortalFile>

    setListFiles(data)
    setLoading(false)
  }

  return { loading, listFiles, getPortalFiles }
}
