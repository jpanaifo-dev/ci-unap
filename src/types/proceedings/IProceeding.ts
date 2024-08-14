import { IDiscount } from '../docs'
import { ILanguages } from '../languages'
import { IPerson } from '../persons'

export interface IProceeding {
  id: number
  is_active: boolean
  is_retirate: boolean
  is_graduated: boolean
  persona: IPerson
  programa: ILanguages
  descuento: IDiscount | null
  expediente?: string
}

export interface IProceedingList {
  id: number
  is_active: boolean
  is_retirate: boolean
  is_graduated: boolean
  persona: IPerson
  programa: ILanguages
  descuento: IDiscount | null
  expediente?: string
}

export interface IProceedingFilter {
  persona__id?: number
  persona__nombres__icontains?: string
  persona__apellido_paterno__icontains?: string
  persona__apellido_materno__icontains?: string
  persona__numero_documento__icontains?: string
  id?: number
  programa__id?: number
  programa__nombre__icontains?: string
  is_active?: boolean
  page?: number
}
