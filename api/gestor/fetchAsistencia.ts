import { fetchCore } from '@/api'
import gestorApi from '@/utils/api/gestorApiUrl.json'
import { IASistenciaDocenteFilter, IAsistenciaFilter } from '@/types'

export async function fetchAsistenciaList(filter: IAsistenciaFilter) {
  const {
    fecha,
    fecha__gte,
    fecha__lte,
    inscripcion__grupo__docente__id,
    inscripcion__grupo__id,
    inscripcion__id,
    inscripcion__matricula__expediente__id,
    inscripcion__matricula__id,
    page,
  } = filter

  const params = new URLSearchParams()

  if (fecha) params.append('fecha', fecha)
  if (fecha__gte) params.append('fecha__gte', fecha__gte)
  if (fecha__lte) params.append('fecha__lte', fecha__lte)
  if (inscripcion__grupo__docente__id)
    params.append(
      'inscripcion__grupo__docente__id',
      inscripcion__grupo__docente__id.toString()
    )
  if (inscripcion__grupo__id)
    params.append('inscripcion__grupo__id', inscripcion__grupo__id.toString())
  if (inscripcion__id)
    params.append('inscripcion__id', inscripcion__id.toString())
  if (inscripcion__matricula__expediente__id)
    params.append(
      'inscripcion__matricula__expediente__id',
      inscripcion__matricula__expediente__id.toString()
    )
  if (inscripcion__matricula__id)
    params.append(
      'inscripcion__matricula__id',
      inscripcion__matricula__id.toString()
    )
  if (page) params.append('page', page.toString())

  const path = `${gestorApi?.AsistenciaList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function fetchAsistenciaDocente(filter: IASistenciaDocenteFilter) {
  const { grupo_id, persona_id } = filter

  const params = new URLSearchParams()

  if (grupo_id) params.append('grupo_id', grupo_id.toString())
  if (persona_id) params.append('persona_id', persona_id.toString())

  const path = `${gestorApi?.AsistenciaPorDocente}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
