import { IEnrollment } from '@/types'
import { IGroup } from './IGroup'

export interface IAsistencia {
  id: number
  is_presente: boolean
  is_justificado: boolean
  is_falta: boolean
  inscripcion: IEnrollment
  grupo: IGroup
  asistencia?: string
}
