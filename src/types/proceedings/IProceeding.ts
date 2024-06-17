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
