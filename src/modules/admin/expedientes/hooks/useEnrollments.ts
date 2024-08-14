'use client'
import { useState } from 'react'
import { IEnrollment, IResApi } from '@/types'
import { fetchGestor } from '@/api'

interface IQEnrollments {
  page: number
  is_active?: string
  numero_documento?: string
  nombres?: string
  apellido_paterno?: string
  apellido_materno?: string
  programa_id?: string
  fecha?: string
  expediente_id?: string
}

export const useEnrollments = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listEnrollmetns, setListEnrollments] =
    useState<IResApi<IEnrollment> | null>(null)

  const getEnrollments = async (query: IQEnrollments) => {
    setLoading(true)

    const {
      page,
      is_active,
      numero_documento,
      nombres,
      apellido_paterno,
      apellido_materno,
      programa_id,
      fecha,
      expediente_id,
    } = query

    const nDocument = numero_documento || ''
    const date = fecha || ''
    const isActive = is_active || ''
    const programaId = programa_id || ''
    const name = nombres || ''
    const surnameP = apellido_paterno || ''
    const surnameM = apellido_materno || ''
    const expedienteId = expediente_id || ''

    const url = `MatriculaList/?is_active=${isActive}&fecha=${date}&expediente__persona__numero_documento__icontains=${nDocument}&expediente__persona__nombres__icontains=${name}&expediente__persona__apellido_paterno__icontains=${surnameP}&expediente__persona__apellido_materno__icontains=${surnameM}&expediente__programa__id=${programaId}&page=${page}&expediente__id=${expedienteId}`

    const response = await fetchGestor(url, { method: 'GET' })
    if (response?.detail) {
      throw new Error('Error al cargar las modalidades')
    }

    const data: IResApi<IEnrollment> = response as IResApi<IEnrollment>
    setListEnrollments(data)
    setLoading(false)
  }

  return { loading, listEnrollmetns, getEnrollments }
}
