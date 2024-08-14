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

export interface IInscriptionsList {
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

export interface IInscriptionFilter {
  matricula__expediente__id?: number
  grupo__modulo__id?: number
  grupo__modulo__nivel__id?: number
  matricula__expediente__persona__numero_documento__icontains?: string
  id?: number
  grupo__modulo__nombre__icontains?: string
  grupo__id?: number
  matricula__expediente__persona__id?: number
  is_active?: boolean
  page?: number
}
