'use client'
import { useState } from 'react'
import { IModality, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQuery {
  name: string
  program_id: number
  status: string
}

export const useModalities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listModalities, setListModalities] =
    useState<IResApi<IModality> | null>(null)

  const getModalities = async (query: IQuery) => {
    setLoading(true)
    const { name, program_id, status } = query
    const response = await fetchGestor(
      `ModalidadList/?is_active=${status}&nombre__icontains=${name}&programa__id=${program_id}`,
      {
        method: 'GET',
      }
    )

    if (response.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IModality> = response as IResApi<IModality>
    setListModalities(data)
    setLoading(false)
  }

  return { listModalities, getModalities, loading }
}
