'use client'
import { useState } from 'react'
import { fetchGestor } from '@/api'
import { IResApi, ITypeDoc } from '@/types'

export const useTypeDoc = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [typesDoc, setTypesDoc] = useState<{
    count: number
    results: ITypeDoc[]
  } | null>(null)

  const getTypeDocs = async () => {
    setLoading(true)
    const response = await fetchGestor('TipoDocumento/', { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar los tipos de documento')
    }

    const data: IResApi<ITypeDoc> = response as IResApi<ITypeDoc>
    setTypesDoc(data)
    setLoading(false)
  }

  return { getTypeDocs, typesDoc, loading }
}
