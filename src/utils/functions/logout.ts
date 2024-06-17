const app_name = process.env.APP_NAME
import { deleteCookie } from './actions'

export async function logout() {
  await deleteCookie(`${app_name}_token`)
  await deleteCookie(`${app_name}_user`)
  await deleteCookie(`${app_name}_persona_id`)
  await deleteCookie(`${app_name}_persona_nombres`)
  await deleteCookie(`${app_name}_groups`)
  await deleteCookie(`${app_name}_permissions`)
  await deleteCookie(`${app_name}_is_superuser`)
  await deleteCookie(`${app_name}_is_staff`)
  await deleteCookie(`${app_name}_is_active`)
  await deleteCookie(`${app_name}_last_login`)
  await deleteCookie(`${app_name}_username`)
  await deleteCookie(`${app_name}_email`)
}
