import { ILanguages } from './ILanguages'
import { ILevel } from './ILevel'
import { IModality } from './IModality'
export interface IModule {
  id: number
  nombre: string
  is_active: boolean
  nivel: ILevel
  modalidad: IModality
  programa?: ILanguages
}
