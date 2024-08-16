// Interfaces para integrantes por grupo
export interface IGroupData {
  docente: IDocente
  modulo: IModulo
  grupo: IGrupo
  alumnos: IAlumno[]
}

export interface IDocente {
  id: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

export interface IModulo {
  id: 1
  nombre: string
  nivel: string
  modalidad: string
}

interface IGrupo {
  id: number
  nombre: string
  fecha_inicio: string
  fecha_final: string
}

export interface IAlumno {
  id: number
  expediente_id: number
  inscripcion_id: number
  nombre: string
  numero_documento: string
  apellidos: string
  correo: string
  celular: string
  telefono: string
  nota1: string
  nota2: string
  promedio: string
  asistencia?: string
}

export interface IGroupDataFilter {
  group_id?: string
  persona_id?: string
}
