import { IUser } from '../auth'
import { ITypeDoc } from '../docs'
import { ICivilStatus } from './ICivilStatus'

export interface IPerson {
  id: number
  //Personal data
  nombres: string
  apellido_materno: string
  apellido_paterno: string
  //Document data
  numero_documento: string
  tipo_documento: ITypeDoc
  fecha_nacimiento: string
  //Id the person
  tipo_documento_id: string
  sexo_id: string | null
  estado_civil_id: string

  //Contact data
  correo: string
  celular: string
  direccion: string
  //Location
  lugar_nacimiento: string
  pais: string
  region: string
  provincia: string
  distrito: string
  //Status data
  ocupacion: string
  is_trabajador: boolean
  estado_civil: ICivilStatus
  sexo: string | null
  //Other data
  user: IUser | null
}
