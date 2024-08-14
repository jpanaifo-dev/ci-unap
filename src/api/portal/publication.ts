import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPublicationFilter } from '@/types'

export async function fetchPublicationsList(filter: IPublicationFilter) {
  const {
    contenido__icontains,
    tipo,
    fecha,
    is_active,
    is_banner,
    titulo__icontains,
    id,
  } = filter

  const params = new URLSearchParams()

  if (contenido__icontains)
    params.append('contenido__icontains', contenido__icontains)
  if (tipo !== undefined) params.append('tipo', tipo.toString())
  if (fecha) params.append('fecha', fecha)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (is_banner !== undefined) params.append('is_banner', is_banner.toString())
  if (titulo__icontains) params.append('titulo__icontains', titulo__icontains)
  if (id) params.append('id', id.toString())

  const path = `${portalApi?.PublicacionList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
