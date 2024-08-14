import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPublicationFileType, IPublicationFileTypeFilter } from '@/types'

export async function fetchPublicationsFilesTypes(
  filter: IPublicationFileTypeFilter
) {
  const { id, page, nombre__icontains } = filter

  const params = new URLSearchParams()

  if (nombre__icontains) params.append('nombre__icontains', nombre__icontains)
  if (page) params.append('page', page.toString())
  if (id) params.append('id', id.toString())

  const path = `${portalApi?.PublicacionTipoFile}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function fetchPublicationFileTypeById(id: number) {
  const path = `${portalApi?.PublicacionTipoFile}${id}/`
  return fetchCore(path, { method: 'GET' })
}

export async function postOrUpdPublicationFileType(data: IPublicationFileType) {
  const path = data.id
    ? `${portalApi?.PublicacionTipoFile}${data.id}/`
    : portalApi?.PublicacionTipo
  const method = data.id ? 'PUT' : 'POST'

  return fetchCore(path, {
    method,
    body: JSON.stringify(data),
  })
}
