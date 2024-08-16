'use client'
import { useState } from 'react'
import { IPayments, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQPayments {
  page: number
  num_documento__icontains: string
}

export const usePayments = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPayments, setListPayments] = useState<IResApi<IPayments> | null>(
    null
  )

  const getPayments = async (query : IQPayments) => {
    setLoading(true)
    const { page, num_documento__icontains } = query
    const url = `PagoList/?id=&concepto_id=&expediente_id=&is_active=&num_documento__icontains=${num_documento__icontains}&fecha_operacion=&num_operacion__icontains=&nombre_cliente__icontains=&page=${page}`

    const response = await fetchGestor(url, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IPayments> = response as IResApi<IPayments>
    setListPayments(data)
    setLoading(false)
  }

  return { loading, listPayments, getPayments }
}
