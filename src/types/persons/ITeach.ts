import { IPerson } from './IPerson'

export interface ITeach {
  id: number
  grado_academico: 'M' | 'D'
  full_name?: string
  persona: IPerson
}
