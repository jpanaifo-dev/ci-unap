'use client'
import { useState } from 'react'
import { IPublicationFileFilter, IPublicationFileList, IResApi } from '@/types'
import { fetchPublicationsFileList } from '@/api'

export const usePublicationsFile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsFiles, setListPublicationsFiles] =
    useState<IResApi<IPublicationFileList> | null>(null)

  const getPublicationsFileList = async (filter: IPublicationFileFilter) => {
    setLoading(true)

    try {
      const res = await fetchPublicationsFileList(filter)

      if (!res.ok) {
        setListPublicationsFiles(null)
        return
      }

      const data: IResApi<IPublicationFileList> =
        (await res.json()) as IResApi<IPublicationFileList>

      setListPublicationsFiles(data)
    } catch (error) {
      setListPublicationsFiles(null)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getPublicationsFileList, listPublicationsFiles }
}
