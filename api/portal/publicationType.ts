import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPublicationType, IPublicationTypeFilter } from '@/types'

export async function fetchPublicationsTypes(filter: IPublicationTypeFilter) {
  const { nombre__icontains, id, page } = filter

  const params = new URLSearchParams()

  if (nombre__icontains) params.append('nombre__icontains', nombre__icontains)
  if (page) params.append('page', page.toString())
  if (id) params.append('id', id.toString())

  const path = `${portalApi?.PublicacionTipo}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function fetchPublicationTypeById(id: number) {
  const path = `${portalApi?.PublicacionTipo}${id}/`
  return fetchCore(path, { method: 'GET' })
}

export async function postOrUpdPublicationType(data: IPublicationType) {
  const path = data.id
    ? `${portalApi?.PublicacionTipo}${data.id}/`
    : portalApi?.PublicacionTipo
  const method = data.id ? 'PUT' : 'POST'

  return fetchCore(path, {
    method,
    body: JSON.stringify(data),
  })
}
