'use client'
import { useState } from 'react'
import { IPublicationFilter, IPublicationList, IResApi } from '@/types'
import { fetchPublicationsList } from '@/api'

export const usePublications = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublications, setListPublications] =
    useState<IResApi<IPublicationList> | null>(null)

  const getPublications = async (query: IPublicationFilter) => {
    setLoading(true)

    const response = await fetchPublicationsList(query)

    if (response.ok) {
      const publications: IResApi<IPublicationList> =
        (await response.json()) as IResApi<IPublicationList>
      setListPublications(publications)
    } else {
      setListPublications(null)
    }
    setLoading(false)
  }

  return { loading, getPublications, listPublications }
}
