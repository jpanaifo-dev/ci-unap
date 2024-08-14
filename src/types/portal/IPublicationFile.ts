import { IPublicationList } from './IPublication'
import { IPublicationFileType } from './IPublicationFileType'

export interface IPublicationFile {
  id: number
  descripcion: string
  link?: string | null
  archivo: string
  is_active: boolean
  is_portada: boolean
  publicacion: IPublicationList
  tipo: IPublicationFileType
  uploadArchivo?: File[]
  tipo_id?: string
}

export interface IPublicationFileList {
  id: number
  descripcion: string
  link?: string | null
  archivo: string
  is_active: boolean
  is_portada: boolean
  publicacion: IPublicationList
  tipo: IPublicationFileType
  uploadArchivo?: File[]
  tipo_id?: string
}

export interface IPublicationFileFilter {
  id?: number
  page?: number
  publicacion?: number
  is_active?: boolean
  is_portada?: boolean
  publicacion__titulo__icontains?: string
  publicacion__fecha?: string
  publicacion__fecha__gte?: string
  publicacion__fecha__lte?: string
  publicacion__tipo__nombre?: string
  publicacion__is_banner?: boolean
}
