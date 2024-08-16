'use client'
import { useState } from 'react'
import { IInscriptions, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQuery {
  num_doc?: string,
  page?: number
}

export const useInscriptions = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listInscriptions, setLisInscriptions] =
    useState<IResApi<IInscriptions> | null>(null)

  const getInscriptions = async (query?: IQuery) => {
    setLoading(true)
    const path = `InscripcionList/?matricula__expediente__persona__numero_documento__icontains=${query?.num_doc}&page=${query?.page}`
    const response = await fetchGestor(path, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las inscripciones')
    }

    const data: IResApi<IInscriptions> = response as IResApi<IInscriptions>
    setLisInscriptions(data)
    setLoading(false)
  }

  return { getInscriptions, listInscriptions, loading }
}
