'use client'
import { useState } from 'react'
import { IPortalFileType, IResApi } from '@/types'
import { fetchCore } from '@/api'
interface IQuery {
  page?: number
  name?: string
}

export const useFilesTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listFiles, setListFiles] = useState<IResApi<IPortalFileType> | null>(
    null
  )

  const getPortalFilesTypes = async (props: IQuery) => {
    setLoading(true)
    const { page, name } = props

    const path = `portal/tipo/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

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
