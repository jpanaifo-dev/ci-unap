import { CalendarDate, RangeValue } from '@nextui-org/react'
import { ITeach } from '../persons'
import { IModule } from './IModule'

interface IRange {
  start: string
  end: string
}

export interface IGroup {
  id: number
  grupo: string
  aforo: string
  fecha_inicio: string
  fecha_final: string
  range?: RangeValue<CalendarDate>
  resolucion: string
  adjunto_resolucion: string
  silabo: string
  upLoadSilabo?: File[]
  is_active: boolean
  docente: ITeach
  modulo: IModule
  uploadAdjuntoResolucion?: File[]
}
