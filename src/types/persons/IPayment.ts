import { IProceeding } from '../proceedings'
import { ITypePayments } from './ITypePayment'

export interface IPayments {
  id: number
  nombre_cliente: string
  num_documento: string
  num_operacion: string
  fecha_operacion: string
  adjunto: string
  is_active: boolean
  monto: string
  concepto: ITypePayments
  expediente: IProceeding
}

export interface IPaymentTxt {
  nombre_cliente: string
  numero_documento: string
  numero_operacion: string
  fecha_operacion: string
  concepto: number
  monto: number
}

// interface PagoModel {
//   nombre_cliente: string
//   numero_documento: string
//   numero_operacion: string
//   fecha_operacion: string
//   monto: number
//   concepto: number
//   is_active: boolean
// }
