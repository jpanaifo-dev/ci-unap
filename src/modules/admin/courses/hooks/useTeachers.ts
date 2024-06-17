'use client'
import { useState } from 'react'
import { ITeach, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQTeachers {
  persona__nombres__icontains: string
  persona__apellido_paterno__icontains?: string
  persona__apellido_materno__icontains?: string
  page: number
}

export const useTeachers = () => {
  const [loading, setLoading] = useState(false)
  const [listTeachers, setListTeachers] = useState<IResApi<ITeach> | null>(null)

  const getTeachers = async (query: IQTeachers) => {
    setLoading(true)
    const { page, persona__nombres__icontains, persona__apellido_paterno__icontains, persona__apellido_materno__icontains } = query
    const url = `DocenteList/?id=&persona_id=&persona__nombres__icontains=${persona__nombres__icontains}&persona__apellido_paterno__icontains=${persona__apellido_paterno__icontains}&persona__apellido_materno__icontains=${persona__apellido_materno__icontains}&persona__numero_documento__icontains=&page=${page}`
    const response = await fetchGestor(url, { method: 'GET' })
    if (response?.detail) {
      throw new Error('Error al cargar los idiomas')
    }
    const data: IResApi<ITeach> = response as IResApi<ITeach>
    setListTeachers(data)
    setLoading(false)
  }

  return { listTeachers, getTeachers, loading }
}
