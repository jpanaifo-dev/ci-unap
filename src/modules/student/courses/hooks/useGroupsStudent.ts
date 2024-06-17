'use client'
import { useState } from 'react'
import { IGroup, IResApi } from '@/types'
import { fetchGestor } from '@/api'

const id_docente = 1

interface IQuery {
  search: string
  status: string
}

export const useGroupsStudent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listGroups, setListGroups] = useState<IResApi<IGroup> | null>(null)

  const getGroupsTeacher = async (query: IQuery) => {
    const { search, status } = query
    setLoading(true)

    const is_active = status === '3' ? '' : status

    const response = await fetchGestor(
      `GrupoList/?docente__persona__id=&docente_id=${id_docente}&is_active=${is_active}&modulo__nombre__icontains=${search}`,
      { method: 'GET' }
    )

    if (response?.detail) {
      throw new Error('Error al cargar los grupos')
    }

    const data: IResApi<IGroup> = response as IResApi<IGroup>
    setListGroups(data)
    setLoading(false)
  }

  return { loading, getGroupsTeacher, listGroups }
}
