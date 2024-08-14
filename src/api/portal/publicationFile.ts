import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPublicationFileFilter } from '@/types'

export async function fetchPublicationsFileList(
  filter: IPublicationFileFilter
) {
  const {
    id,
    is_active,
    is_portada,
    publicacion,
    publicacion__fecha,
    publicacion__fecha__gte,
    publicacion__fecha__lte,
    publicacion__is_banner,
    publicacion__tipo__nombre,
    publicacion__titulo__icontains,
  } = filter

  const params = new URLSearchParams()

  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (is_portada) params.append('is_portada', is_portada.toString())
  if (publicacion) params.append('publicacion', publicacion.toString())
  if (publicacion__fecha)
    params.append('publicacion__fecha', publicacion__fecha)
  if (publicacion__fecha__gte)
    params.append('publicacion__fecha__gte', publicacion__fecha__gte)
  if (publicacion__fecha__lte)
    params.append('publicacion__fecha__lte', publicacion__fecha__lte)
  if (publicacion__is_banner)
    params.append('publicacion__is_banner', publicacion__is_banner.toString())
  if (publicacion__tipo__nombre)
    params.append('publicacion__tipo__nombre', publicacion__tipo__nombre)
  if (publicacion__titulo__icontains)
    params.append(
      'publicacion__titulo__icontains',
      publicacion__titulo__icontains
    )

  if (id) params.append('id', id.toString())

  const path = `${portalApi?.PublicacionFileList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
