'use client'
import { useState } from 'react'
import { fetchCore } from '@/api'
import { IGroupAuth } from '@/types'

export const useRoles = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listRoles, setlistRoles] = useState<IGroupAuth[]>([])

  const getRoles = async () => {
    setLoading(true)
    const response = await fetchCore('accounts/get_roles/', { method: 'GET' })

    if (!response?.ok) {
      throw new Error('Error al cargar los tipos de documento')
    }

    const data: IGroupAuth[] = (await response.json()) as IGroupAuth[]
    setlistRoles(data)
    setLoading(false)
  }

  return {
    getRoles,
    listRoles,
    loading,
  }
}
