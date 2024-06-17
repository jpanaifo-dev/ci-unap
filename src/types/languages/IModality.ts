import { ILanguages } from './ILanguages'
export interface IModality {
  id: number
  nombre: string
  descripcion: string | null
  is_active: boolean
  programa: ILanguages
}
