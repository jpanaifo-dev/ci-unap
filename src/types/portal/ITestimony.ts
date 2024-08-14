import { IPerson } from '../persons'

export interface ITestimony {
  id: string
  persona: IPerson
  contenido: string
  is_active: boolean
  is_public: boolean
  valoracion: number
  fecha: string
}
export interface ITestimonyList {
  id: string
  persona: IPerson
  contenido: string
  is_active: boolean
  is_public: boolean
  valoracion: number
  fecha: string
}

export interface ITestimonyFilter {
  id?: string
  persona__nombres__icontains?: string
  persona__apellido_paterno__icontains?: string
  persona__apellido_materno__icontains?: string
  persona__numero_documento?: string
  contenido__icontains?: string
  fecha?: string
  is_active?: boolean
  is_public?: boolean
  page?: number
}
