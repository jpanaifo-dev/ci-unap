import { fetchCore } from '@/api'
import portalApi from '@/utils/api/portalApiUrl.json'
import { IPortalFile, IPortalFileFilter } from '@/types'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd + 'api/' : urlLocal

export async function fetchFileList(filter: IPortalFileFilter) {
  const { id, nombre__icontains } = filter

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (nombre__icontains) params.append('nombre__icontains', nombre__icontains)

  const path = `${portalApi?.FileList}?${params.toString()}`
  return fetchCore(path, { method: 'GET' })
}

export async function createOrUpdateFile(data: IPortalFile) {
  const formData = new FormData()

  formData.append('nombre', data.nombre)
  formData.append('tipo', data.tipo.toString())
  if (data.archivo) {
    formData.append('archivo', data.archivo[0])
  }

  console.log('formData', formData)

  if (data.id) {
    const path = `${urlBase}${portalApi?.File}${data.id}/`
    return fetch(path, {
      method: 'PUT',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
  } else {
    const path = `${urlBase}${portalApi?.File}`
    return fetch(path, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
  }
}
