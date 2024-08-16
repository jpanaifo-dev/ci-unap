'use client'
import { useState } from 'react'
import { fetchTestimonioList } from '@/api'
import { ITestimonyList, IResApi, ITestimonyFilter } from '@/types'

interface IQuery {
  page?: number
  name?: string
  date?: string
  is_active?: boolean
  is_public?: boolean
}

export const useTestimonials = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listTestimonials, setLisTestimonials] =
    useState<IResApi<ITestimonyList> | null>(null)

  const getTestimonialsList = async (filter: ITestimonyFilter) => {
    setLoading(true)

    const response = await fetchTestimonioList(filter)

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<ITestimonyList> =
      (await response.json()) as IResApi<ITestimonyList>
    setLisTestimonials(data)
    setLoading(false)
  }

  return { loading, listTestimonials, getTestimonialsList }
}
