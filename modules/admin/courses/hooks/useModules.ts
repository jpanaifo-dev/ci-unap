'use client'
import { useState } from 'react'
import { IModule, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQModules {
  name: string
  nameProgram?: string
  nameModality?: string
  status?: string
  modalidad_id?: string
  nivel_id?: string
  program_id?: string
  page: number
}

export const useModules = () => {
  const [loading, setLoading] = useState(false)
  const [listModules, setListModules] = useState<IResApi<IModule> | null>(null)

  const getModules = async (query: IQModules) => {
    setLoading(true)
    const {
      name,
      nameProgram,
      nameModality,
      page,
      modalidad_id,
      nivel_id,
      program_id,
      status,
    } = query
    const path = `ModuloList/?nombre__icontains=${name}&modalidad__programa__id=${program_id}&modalidad__programa__nombre__icontains=${nameProgram}&modalidad__nombre__icontains=${nameModality}&id=&is_active=${status}&modalidad__id=${modalidad_id}&nivel__id=${nivel_id}page=${page}`

    const response = await fetchGestor(path, { method: 'GET' })
    if (response?.detail) {
      throw new Error('Error al cargar los idiomas')
    }
    const data: IResApi<IModule> = response as IResApi<IModule>
    setListModules(data)
    setLoading(false)
  }

  return { listModules, getModules, loading }
}
