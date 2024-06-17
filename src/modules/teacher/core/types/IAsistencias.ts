export interface IAsistencias {
  docente: {
    id: number
    nombre: string
    apellidos: string
    email: string
    telefono: string
  }
  asistencias: {
    id: number
    fecha: string
    presentes: number
    ausentes: number
    justificados: number
  }[]
}
