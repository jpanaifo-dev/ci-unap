'use client'
import { useState } from 'react'
import { IProceeding, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQProceedings {
  page: number
  persona_numero_documento?: string
  persona_nombres?: string
  persona_apellido_paterno?: string
  persona_apellido_materno?: string
  programa_id?: string
  status?: string
}

export const useProceedings = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listProceedings, setListProceedings] = useState<{
    count: number
    results: IProceeding[]
  } | null>(null)

  const getExpedientes = async (query: IQProceedings) => {
    setLoading(true)
    const {
      page,
      persona_numero_documento,
      persona_apellido_materno,
      persona_apellido_paterno,
      persona_nombres,
      programa_id,
      status,
    } = query

    const currentPage = page || 1
    const dni = persona_numero_documento || ''
    const nombre = persona_nombres || ''
    const apellidoPaterno = persona_apellido_paterno || ''
    const apellidoMaterno = persona_apellido_materno || ''
    const programaId = programa_id || ''
    const estado = status || ''

    const url = `ExpedienteList/?persona__nombres__icontains=${nombre}&persona__apellido_paterno__icontains=${apellidoPaterno}&persona__apellido_materno__icontains=${apellidoMaterno}&persona__numero_documento__icontains=${dni}&id=&programa__id=${programaId}&is_active=${estado}&page=${currentPage}`
    const response = await fetchGestor(url, { method: 'GET' })
    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IProceeding> = response as IResApi<IProceeding>
    setListProceedings(data)
    setLoading(false)
  }

  return { getExpedientes, listProceedings, loading }
}
