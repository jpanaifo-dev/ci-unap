'use client'
import { useState } from 'react'
import { fetchFileList } from '@/api'
import { IPortalFileFilter, IPortalFileList, IResApi } from '@/types'

export const useFiles = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listFiles, setListFiles] = useState<IResApi<IPortalFileList> | null>(
    null
  )

  const getPortalFiles = async (filter: IPortalFileFilter) => {
    setLoading(true)

    const response = await fetchFileList(filter)

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<IPortalFileList> =
      (await response.json()) as IResApi<IPortalFileList>

    setListFiles(data)
    setLoading(false)
  }

  return { loading, listFiles, getPortalFiles }
}
