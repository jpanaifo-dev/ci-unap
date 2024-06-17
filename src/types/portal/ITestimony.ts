import { IPerson } from '../persons'

export interface ITestimony {
  id: string
  persona: IPerson
  contenido: string
  is_active: boolean
  is_public: boolean
  valoracion: number
  fecha: string
}
