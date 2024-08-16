'use client'
import { useState } from 'react'
import { fetchTipo } from '@/api'
import { IPortalFileType, IResApi, IPortalFileTypeFilter } from '@/types'

export const useFilesTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listFiles, setListFiles] = useState<IResApi<IPortalFileType> | null>(
    null
  )

  const getPortalFilesTypes = async (filter: IPortalFileTypeFilter) => {
    setLoading(true)

    const response = await fetchTipo(filter)

    if (!response?.ok) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IPortalFileType> =
      (await response.json()) as IResApi<IPortalFileType>

    setListFiles(data)
    setLoading(false)
  }

  return { loading, listFiles, getPortalFilesTypes }
}
