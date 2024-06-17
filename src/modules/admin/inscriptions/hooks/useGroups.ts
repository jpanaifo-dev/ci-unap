'use client'
import { useState } from 'react'
import { IGroup, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQGroups {
  name_teacher?: string
  surname_teacher?: string
  number_doc_teacher?: string
  name_nivel?: string
  name_modulo?: string
  date_start?: string
  date_end?: string
  page: number
}

export const useGroups = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listGroups, setListGroups] = useState<IResApi<IGroup> | null>(null)

  const getGroups = async (query: IQGroups) => {
    setLoading(true)
    const {
      date_end,
      date_start,
      name_modulo,
      name_nivel,
      name_teacher,
      number_doc_teacher,
      surname_teacher,
      page,
    } = query
    const dateEnd = date_end ? `&fecha_final__year=${date_end}` : ''
    const dateStart = date_start ? `&fecha_inicio__year=${date_start}` : ''
    const nameModulo = name_modulo
      ? `&modulo__nombre__icontains=${name_modulo}`
      : ''
    const nameNivel = name_nivel
      ? `&modulo__nivel__nombre__icontains=${name_nivel}`
      : ''
    const nameTeacher = name_teacher
      ? `&docente__persona__nombres__icontains=${name_teacher}`
      : ''
    const numberDocTeacher = number_doc_teacher
      ? `&docente__persona__numero_documento=${number_doc_teacher}`
      : ''
    const surnameTeacher = surname_teacher
      ? `&docente__persona__apellido_paterno__icontains=${surname_teacher}`
      : ''

    const path = `GrupoList/?${dateEnd}${dateStart}${nameModulo}${nameNivel}${nameTeacher}${numberDocTeacher}${surnameTeacher}&page=${page}`
    const response = await fetchGestor(path, { method: 'GET' })

    if (response?.detail) {
      throw new Error('Error al cargar los grupos')
    }

    const data: IResApi<IGroup> = response as IResApi<IGroup>
    setListGroups(data)
    setLoading(false)
  }

  return { loading, getGroups, listGroups }
}
