import { IPublicationType } from './IPublicationType'

export interface IPublication {
  id: number
  titulo: string
  contenido: string
  fecha: string
  is_active: boolean
  is_banner: boolean
  tipo: number
}

export interface IPublicationList {
  id: number
  titulo: string
  contenido: string
  fecha: string
  is_active: boolean
  is_banner: boolean
  tipo: IPublicationType
}

export interface IPublicationFilter {
  id?: number
  contenido__icontains?: string
  page?: number
  tipo?: number
  fecha?: string
  is_active?: boolean
  is_banner?: boolean
  titulo__icontains?: string
}
