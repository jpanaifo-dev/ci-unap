'use client'
import { useState } from 'react'
import { IPublicationType, IResApi, IPublicationTypeFilter } from '@/types'
import { fetchPublicationsTypes } from '@/api'

export const usePublicationsTypes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPublicationsType, setListPublicationsType] =
    useState<IResApi<IPublicationType> | null>(null)

  const getPublicationsTypes = async (props: IPublicationTypeFilter) => {
    setLoading(true)

    try {
      const response = await fetchPublicationsTypes(props)

      if (response.ok) {
        const data: IResApi<IPublicationType> = await response.json()
        setListPublicationsType(data)
      } else {
        setListPublicationsType(null)
      }
    } catch (error) {
      console.error('Error getPublicationsTypes:', error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, listPublicationsType, getPublicationsTypes }
}
