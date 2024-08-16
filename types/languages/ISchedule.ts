import { IClassroom } from './IClassroom'
import { IGroup } from './IGroup'
import { ITurno } from './ITurno'

export interface ISchedule {
  id: number
  dia: string
  grupo: IGroup
  turno: ITurno
  aula: IClassroom
}
