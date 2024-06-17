'use client'
import { useState } from 'react'
import { IDiscount, IResApi } from '@/types'
import { fetchGestor } from '@/api'

export const useDiscounts = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listDiscounts, setListDiscounts] = useState<{
    count: number
    results: IDiscount[]
  } | null>(null)

  const getDiscounts = async () => {
    setLoading(true)
    const response = await fetchGestor('Descuento/', { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IDiscount> = response as IResApi<IDiscount>
    setListDiscounts(data)
    setLoading(false)
  }

  return { getDiscounts, listDiscounts, loading }
}
