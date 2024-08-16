import { ILanguages } from './ILanguages'

export interface ILevel {
  id: number
  nombre: string
  is_active: boolean
  programa: ILanguages | null
}
