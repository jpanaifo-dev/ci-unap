import { ITeach } from '../persons'
import { IModule } from './IModule'

export interface IGroup {
  id: number
  grupo: string
  aforo: string
  fecha_inicio: string
  fecha_final: string
  resolucion: string
  adjunto_resolucion: string
  silabo: string
  upLoadSilabo?: File[]
  is_active: boolean
  docente: ITeach
  modulo: IModule
  uploadAdjuntoResolucion?: File[]
}
export interface IGroupList {
  id: number
  grupo: string
  aforo: string
  fecha_inicio: string
  fecha_final: string
  resolucion: string
  adjunto_resolucion: string
  silabo: string
  upLoadSilabo?: File[]
  is_active: boolean
  docente: ITeach
  modulo: IModule
  uploadAdjuntoResolucion?: File[]
}

export interface IGroupListFilter {
  docente__persona__id?: number
  docente_id?: number
  docente__persona__nombres__icontains?: string
  docente__persona__apellido_paterno__icontains?: string
  docente__persona__apellido_materno__icontains?: string
  docente__persona__numero_documento?: string
  modulo__modalidad__id?: number
  is_active?: boolean
  modulo__id?: number
  modulo__modalidad__programa__id?: number
  modulo__nivel__id?: number
  modulo__nivel__nombre__icontains?: string
  modulo__nombre__icontains?: string
  id?: number
  fecha_inicio__year?: number
  fecha_final__year?: number
  page?: number
}
