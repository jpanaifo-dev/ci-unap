const app_name = process.env.APP_NAME
import { deleteCookie } from './actions'

export async function logout() {
  await deleteCookie(`${app_name}_user`)
}
