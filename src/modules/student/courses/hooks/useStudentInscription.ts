'use client'

import { fetchGestor } from '@/api'
import { IInscriptions, IResApi } from '@/types'
import { useState } from 'react'

interface IQueryInscription {
  search?: string
  status: string
}

const id_expediente = 1

export const useStudentInscription = () => {
  const [listInscription, setListInscription] =
    useState<IResApi<IInscriptions> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getInscriptionByExpedients = async () => {
    setLoading(true)
    const response = await fetchGestor(
      `InscripcionList/?matricula__expediente__id=${id_expediente}`,
      {
        method: 'GET',
      }
    )
    if (response.detail) {
      throw new Error('Error al cargar las inscripciones')
    }
    const data: IResApi<IInscriptions> = response as IResApi<IInscriptions>
    setListInscription(data)
    setLoading(false)
  }

  return { listInscription, getInscriptionByExpedients, loading }
}
