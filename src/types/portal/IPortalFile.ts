import { IPortalFileType } from './IPortalFileType'

export interface IPortalFile {
  id: number
  nombre: string
  archivo: string
  uploadArchivo?: File[]
  tipo: IPortalFileType
}
