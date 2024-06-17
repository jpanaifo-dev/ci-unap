import { fetchCore } from './fetchCore'
export async function fetchGestor(
  path: string,
  options: RequestInit,
  nextConfig?: { [key: string]: any }
) {
  const response = await fetchCore(`gestor/${path}`, options, nextConfig)

  if (!response.ok) {
    console.error('Error en la petición')
    return null
  }
  return response.json()
}
