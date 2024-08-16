import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPortalFileType, IPortalFileTypeFilter } from '@/types'

export async function fetchTipo(filter: IPortalFileTypeFilter) {
  const { id, page, nombre__icontains, is_active } = filter

  const params = new URLSearchParams()

  if (nombre__icontains) params.append('nombre__icontains', nombre__icontains)
  if (page) params.append('page', page.toString())
  if (id) params.append('id', id.toString())
  if (is_active !== undefined) params.append('is_active', is_active.toString())

  const path = `${portalApi?.tipo}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function fetchTipoById(id: number) {
  const path = `${portalApi?.tipo}${id}/`
  return fetchCore(path, { method: 'GET' })
}

export async function postOrUpdateTipo(data: IPortalFileType) {
  const path = data.id ? `${portalApi?.tipo}${data.id}/` : portalApi?.tipo
  const method = data.id ? 'PUT' : 'POST'

  return fetchCore(path, {
    method,
    body: JSON.stringify(data),
  })
}
