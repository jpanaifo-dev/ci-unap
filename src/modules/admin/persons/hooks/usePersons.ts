'use client'
import { useState } from 'react'
import { IPerson, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQPerson {
  numero_documento__icontains?: string
  nombres__icontains?: string
  apellido_paterno__icontains?: string
  apellido_materno__icontains?: string
  page?: number
}

export const usePersons = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPersons, setPersons] = useState<{
    count: number
    results: IPerson[]
  } | null>(null)

  const getPersons = async (query: IQPerson) => {
    setLoading(true)
    const { page, ...rest } = query
    const numDoc = rest.numero_documento__icontains
      ? `&numero_documento__icontains=${rest.numero_documento__icontains}`
      : ''
    const name = rest.nombres__icontains
      ? `&nombres__icontains=${rest.nombres__icontains}`
      : ''
    const lastName = rest.apellido_paterno__icontains
      ? `&apellido_paterno__icontains=${rest.apellido_paterno__icontains}`
      : ''
    const lastName2 = rest.apellido_materno__icontains
      ? `&apellido_materno__icontains=${rest.apellido_materno__icontains}`
      : ''

    const path = `PersonaList/?page=${page}${numDoc}${name}${lastName}${lastName2}`
    const response = await fetchGestor(path, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar las personas')
    }

    const data: IResApi<IPerson> = response as IResApi<IPerson>
    setPersons(data)
    setLoading(false)
  }

  return { getPersons, listPersons, loading }
}
