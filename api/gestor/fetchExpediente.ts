import { fetchCore } from '@/api'
import gestorApi from '@/utils/api/gestorApiUrl.json'
import { IProceedingFilter } from '@/types'

export async function fetchExpedienteList(filter: IProceedingFilter) {
  const {
    persona__id,
    persona__nombres__icontains,
    persona__apellido_paterno__icontains,
    persona__apellido_materno__icontains,
    persona__numero_documento__icontains,
    id,
    programa__id,
    programa__nombre__icontains,
    is_active,
  } = filter

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (persona__id) params.append('persona__id', persona__id.toString())
  if (persona__nombres__icontains)
    params.append('persona__nombres__icontains', persona__nombres__icontains)
  if (persona__apellido_paterno__icontains)
    params.append(
      'persona__apellido_paterno__icontains',
      persona__apellido_paterno__icontains
    )
  if (persona__apellido_materno__icontains)
    params.append(
      'persona__apellido_materno__icontains',
      persona__apellido_materno__icontains
    )
  if (persona__numero_documento__icontains)
    params.append(
      'persona__numero_documento__icontains',
      persona__numero_documento__icontains
    )
  if (programa__id) params.append('programa__id', programa__id.toString())
  if (programa__nombre__icontains)
    params.append('programa__nombre__icontains', programa__nombre__icontains)
  if (is_active !== undefined) params.append('is_active', is_active.toString())

  const path = `${gestorApi?.ExpedienteList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
