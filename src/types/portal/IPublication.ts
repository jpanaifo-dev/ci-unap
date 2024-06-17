import { IPublicationType } from './IPublicationType'

export interface IPublication {
  id: number
  titulo: string
  contenido: string
  fecha: string
  is_active: boolean
  is_banner: boolean
  tipo: IPublicationType
}
