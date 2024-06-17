'use client'
import { useState } from 'react'
import { ITypePayments, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQPayConcepts {
  page: number
  concepto__icontains: string
}

export const usePayConcepts = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPayConcepts, setListPayConcepts] =
    useState<IResApi<ITypePayments> | null>(null)

  const getPayConcepts = async (query: IQPayConcepts) => {
    setLoading(true)
    const {page, concepto__icontains} = query
    const url = `Concepto/?id=&is_active=&concepto__icontains=${concepto__icontains}&codigo__icontains=&page=${page}`
    const response = await fetchGestor(url, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<ITypePayments> = response as IResApi<ITypePayments>
    setListPayConcepts(data)
    setLoading(false)
  }

  return { loading, getPayConcepts, listPayConcepts }
}

