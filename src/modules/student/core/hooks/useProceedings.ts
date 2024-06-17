'use client'
import { useState } from 'react'
import { IProceeding, IResApi } from '@/types'
import { fetchGestor } from '@/api'

import { getCookie } from '@/utils'
import { IResCookie } from '@/types'

const appName = process.env.APP_NAME
interface IQueryProceeding {
  page?: number
  name_program?: string
  is_active?: boolean | string
}

export const useStudentsProceeding = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [proceedings, setProceedings] = useState<IResApi<IProceeding> | null>(
    null
  )

  const getProceedings = async (query: IQueryProceeding) => {
    setLoading(true)
    const { is_active, name_program, page } = query

    const resCookie: IResCookie = (await getCookie(
      `${appName}_persona_id`
    )) as IResCookie

    const person_id = resCookie?.value

    const path = `ExpedienteList/?persona__id=${person_id}&persona__nombres__icontains=&persona__apellido_paterno__icontains=&persona__apellido_materno__icontains=&persona__numero_documento=&id=&programa__id=&programa__nombre__icontains=${name_program}&is_active=${is_active}`
    const response = await fetchGestor(path, { method: 'GET' })
    if (response?.detail) {
      throw new Error('Error al cargar los idiomas')
    }
    const data: IResApi<IProceeding> = response as IResApi<IProceeding>
    setProceedings(data)
    setLoading(false)
  }

  return { proceedings, getProceedings, loading }
}
