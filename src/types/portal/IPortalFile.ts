import { IPortalFileType } from './IPortalFileType'

export interface IPortalFile {
  id: number
  nombre: string
  archivo: File[]
  tipo: string
}

export interface IPortalFileList {
  id: number
  nombre: string
  archivo: string
  tipo: IPortalFileType
}

export interface IPortalFileFilter {
  id?: number
  nombre__icontains?: string
  page?: number
  // tipo?: number
  // is_active?: boolean
}
