import { fetchCore } from '@/api'
import gestorApi from '@/utils/api/gestorApiUrl.json'
import { IInscriptionFilter } from '@/types'

export async function fetchInscripcionList(filter: IInscriptionFilter) {
  const {
    id,
    is_active,
    grupo__id,
    grupo__modulo__id,
    grupo__modulo__nivel__id,
    grupo__modulo__nombre__icontains,
    matricula__expediente__id,
    matricula__expediente__persona__id,
    matricula__expediente__persona__numero_documento__icontains,
    page,
  } = filter

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (grupo__id) params.append('grupo__id', grupo__id.toString())
  if (grupo__modulo__id)
    params.append('grupo__modulo__id', grupo__modulo__id.toString())
  if (grupo__modulo__nivel__id)
    params.append(
      'grupo__modulo__nivel__id',
      grupo__modulo__nivel__id.toString()
    )
  if (grupo__modulo__nombre__icontains)
    params.append(
      'grupo__modulo__nombre__icontains',
      grupo__modulo__nombre__icontains
    )
  if (matricula__expediente__id)
    params.append(
      'matricula__expediente__id',
      matricula__expediente__id.toString()
    )
  if (matricula__expediente__persona__id)
    params.append(
      'matricula__expediente__persona__id',
      matricula__expediente__persona__id.toString()
    )
  if (matricula__expediente__persona__numero_documento__icontains)
    params.append(
      'matricula__expediente__persona__numero_documento__icontains',
      matricula__expediente__persona__numero_documento__icontains
    )
  if (page) params.append('page', page.toString())
  if (is_active !== undefined) params.append('is_active', is_active.toString())

  const path = `${gestorApi?.InscripcionList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
