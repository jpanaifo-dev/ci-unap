'use client'
import { useState } from 'react'
import { ITestimony, IResApi } from '@/types'
import { fetchCore } from '@/api'
import { revalidatePath } from 'next/cache'

interface IQuery {
  page?: number
  name?: string
}

export const useTestimonials = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listTestimonials, setLisTestimonials] =
    useState<IResApi<ITestimony> | null>(null)

  const getPublicationsFile = async (query: IQuery) => {
    setLoading(true)
    const { page, name } = query

    const path = `portal/TestmoioList/?page=${page}&nombre__icontains=${name}`
    const response = await fetchCore(path, { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<ITestimony> =
      (await response.json()) as IResApi<ITestimony>

    setLisTestimonials(data)
    setLoading(false)
  }

  const getTestimonials = async (query: IQuery) => {
    setLoading(true)

    const { name, page } = query
    const url = `portal/TestimonioList/?id=&persona__nombres__icontains=${name}&persona__apellido_paterno__icontains=&persona__apellido_materno__icontains=&persona__numero_documento=&contenido__icontains=&fecha=&is_active=&is_public=&?page=${page}`

    const rest = await fetchCore(url, {method: 'GET'}, { cache: 'no-store', revalidatePath: 0})

    if (!rest?.ok){
      throw new Error('Error al cargar los archivos')
    }

    const data: IResApi<ITestimony> = (await rest.json()) as IResApi<ITestimony>
    setLisTestimonials(data)
    setLoading(false)
  }

  return { loading, getPublicationsFile, listTestimonials, getTestimonials }
}
