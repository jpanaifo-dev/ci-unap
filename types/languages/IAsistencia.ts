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
export interface IAsistenciaList {
  id: number
  is_presente: boolean
  is_justificado: boolean
  is_falta: boolean
  inscripcion: IEnrollment
  grupo: IGroup
  asistencia?: string
}

export interface IAsistenciaFilter {
  inscripcion__id?: number
  inscripcion__grupo__id?: number
  inscripcion__matricula__id?: number
  inscripcion__matricula__expediente__id?: number
  inscripcion__grupo__docente__id?: number
  fecha?: string
  fecha__gte?: string
  fecha__lte?: string
  page?: number
}

// persona_id=${id}&grupo_id=${grupo_id}
export interface IASistenciaDocenteFilter {
  persona_id?: number
  grupo_id?: number
  // fecha?: string
  // page?: number
}
