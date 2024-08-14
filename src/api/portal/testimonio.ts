import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPublicationFilter, ITestimonyFilter } from '@/types'

export async function fetchTestimonioList(filter: ITestimonyFilter) {
  const {
    contenido__icontains,
    id,
    fecha,
    is_active,
    is_public,
    persona__apellido_materno__icontains,
    persona__apellido_paterno__icontains,
    persona__nombres__icontains,
    persona__numero_documento,
    page,
  } = filter

  const params = new URLSearchParams()

  if (contenido__icontains)
    params.append('contenido__icontains', contenido__icontains)
  if (fecha) params.append('fecha', fecha)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (is_public !== undefined) params.append('is_public', is_public.toString())
  if (persona__apellido_materno__icontains)
    params.append(
      'persona__apellido_materno__icontains',
      persona__apellido_materno__icontains
    )
  if (persona__apellido_paterno__icontains)
    params.append(
      'persona__apellido_paterno__icontains',
      persona__apellido_paterno__icontains
    )
  if (persona__nombres__icontains)
    params.append('persona__nombres__icontains', persona__nombres__icontains)
  if (persona__numero_documento)
    params.append('persona__numero_documento', persona__numero_documento)
  if (page) params.append('page', page.toString())
  if (id) params.append('id', id.toString())

  const path = `${portalApi?.TestimonioList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}
