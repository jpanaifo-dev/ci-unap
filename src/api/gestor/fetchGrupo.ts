import { fetchCore } from '@/api'
import gestorApi from '@/utils/api/gestorApiUrl.json'
import { IGroupDataFilter, IGroupListFilter } from '@/types'

export async function fetchGrupoList(filter: IGroupListFilter) {
  const {
    is_active,
    docente__persona__apellido_materno__icontains,
    docente__persona__apellido_paterno__icontains,
    docente__persona__id,
    docente__persona__nombres__icontains,
    docente__persona__numero_documento,
    docente_id,
    fecha_final__year,
    fecha_inicio__year,
    id,
    modulo__id,
    modulo__modalidad__id,
    modulo__modalidad__programa__id,
    modulo__nivel__id,
    modulo__nivel__nombre__icontains,
    modulo__nombre__icontains,
    page,
  } = filter

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (docente__persona__id)
    params.append('docente__persona__id', docente__persona__id.toString())
  if (docente_id) params.append('docente_id', docente_id.toString())
  if (docente__persona__nombres__icontains)
    params.append(
      'docente__persona__nombres__icontains',
      docente__persona__nombres__icontains
    )
  if (docente__persona__apellido_paterno__icontains)
    params.append(
      'docente__persona__apellido_paterno__icontains',
      docente__persona__apellido_paterno__icontains
    )
  if (docente__persona__apellido_materno__icontains)
    params.append(
      'docente__persona__apellido_materno__icontains',
      docente__persona__apellido_materno__icontains
    )
  if (docente__persona__numero_documento)
    params.append(
      'docente__persona__numero_documento',
      docente__persona__numero_documento
    )
  if (modulo__id) params.append('modulo__id', modulo__id.toString())
  if (modulo__modalidad__id)
    params.append('modulo__modalidad__id', modulo__modalidad__id.toString())
  if (modulo__modalidad__programa__id)
    params.append(
      'modulo__modalidad__programa__id',
      modulo__modalidad__programa__id.toString()
    )
  if (modulo__nivel__id)
    params.append('modulo__nivel__id', modulo__nivel__id.toString())
  if (modulo__nivel__nombre__icontains)
    params.append(
      'modulo__nivel__nombre__icontains',
      modulo__nivel__nombre__icontains
    )
  if (modulo__nombre__icontains)
    params.append('modulo__nombre__icontains', modulo__nombre__icontains)
  if (fecha_inicio__year)
    params.append('fecha_inicio__year', fecha_inicio__year.toString())
  if (fecha_final__year)
    params.append('fecha_final__year', fecha_final__year.toString())
  if (page) params.append('page', page.toString())

  const path = `${gestorApi?.GrupoList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function fetchAlumnosGrupo(filter: IGroupDataFilter) {
  const { group_id, persona_id } = filter

  const params = new URLSearchParams()

  if (group_id) params.append('grupo_id', group_id)
  if (persona_id) params.append('persona_id', persona_id)

  const path = `${gestorApi?.AlumnosForGrupo}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
