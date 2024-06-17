import { IPublication } from './IPublication'
import { IPublicationFileType } from './IPublicationFileType'

export interface IPublicationFile {
  id: number
  descripcion: string
  link?: string | null
  archivo: string
  is_active: boolean
  is_portada: boolean
  publicacion: IPublication
  tipo: IPublicationFileType
  uploadArchivo?: File[]
  tipo_id?: string
}
