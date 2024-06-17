import { ILevel } from '../languages'
import { IProceeding } from './IProceeding'

// interfaz matricula
export interface IEnrollment {
  id: number
  fecha: string
  is_active: boolean
  is_retired: boolean
  nivel: ILevel | string
  expediente: IProceeding
}
