'use client'

import { useState } from "react"
import { fetchGestor } from "@/api"
import { IProceeding } from "@/types"

interface IQuery {
    name?: string
    apellidoPaterno?: string
    apellidoMaterno?: string
    numeroDocumento?: string
    id?: string
    programaId?: string
    programaNombre?: string
    isActive?: boolean | undefined
    isGraduated?: boolean | undefined
    isRetired?: boolean | undefined
}

export const useReports = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listReports, setListReports] = useState<IProceeding[] | null>(null)

    const getExpedientsReport = async (query?: IQuery) => {
        setLoading(true)

        const queryParams = new URLSearchParams()

        if (query?.name) queryParams.append('persona__nombres__icontains', query.name)
        if (query?.apellidoPaterno) queryParams.append('persona__apellido_paterno__icontains', query.apellidoPaterno)
        if (query?.apellidoMaterno) queryParams.append('persona__apellido_materno__icontains', query.apellidoMaterno)
        if (query?.numeroDocumento) queryParams.append('persona__numero_documento', query.numeroDocumento)
        if (query?.id) queryParams.append('id', query.id)
        if (query?.programaId) queryParams.append('programa__id', query.programaId)
        if (query?.programaNombre) queryParams.append('programa__nombre__icontains', query.programaNombre)
        if (query?.isActive !== undefined) queryParams.append('is_active', query.isActive.toString());
        if (query?.isGraduated !== undefined) queryParams.append('is_graduated', query.isGraduated.toString());
        if (query?.isRetired !== undefined) queryParams.append('is_retired', query.isRetired.toString());

        const response = await fetchGestor(`ExpedienteReporte/?${queryParams.toString()}`, { method: 'GET' })



        if (response?.detail) {
            throw new Error('Error al cargar las modalidades')
        }

        const data: IProceeding[] = response as IProceeding[]
        setListReports(data)
        setLoading(false)
    }

    return { loading, listReports, getExpedientsReport }
}
