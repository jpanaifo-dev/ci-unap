import { IGroup } from '../languages/IGroup'
import { IEnrollment } from './IEnrollment'

// interfaz inscripciones
export interface IInscriptions {
  id: number
  is_publicado: boolean
  is_cerrado: boolean
  is_retired: boolean
  is_active: boolean
  fecha_cierre_acta: string
  notaavance1: string
  notaavance2: string
  promedio: string
  matricula: IEnrollment
  grupo: IGroup
}
