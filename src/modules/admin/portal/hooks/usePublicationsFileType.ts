'use client'
import { useState } from 'react'
import {
  IPublicationFileType,
  IPublicationFileTypeFilter,
  IResApi,
} from '@/types'
import { fetchPublicationsFilesTypes } from '@/api'

export const usePublicationsFilesTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsFileType, setListPublicationsFileType] =
    useState<IResApi<IPublicationFileType> | null>(null)

  const getPublicationsFilesTypes = async (
    query: IPublicationFileTypeFilter
  ) => {
    setLoading(true)

    try {
      const res = await fetchPublicationsFilesTypes(query)

      if (!res.ok) {
        setListPublicationsFileType(null)
        return
      }

      const data: IResApi<IPublicationFileType> =
        (await res.json()) as IResApi<IPublicationFileType>

      setListPublicationsFileType(data)
    } catch (error) {
      setListPublicationsFileType(null)
    } finally {
      setLoading(false)
    }
  }

  return { loading, listPublicationsFileType, getPublicationsFilesTypes }
}
