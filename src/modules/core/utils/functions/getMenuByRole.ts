import { IMenuSideBar, Role } from '@/types'

export function getMenuByRole(
  role: Role,
  menus: { [key: string]: IMenuSideBar[] }
) {
  return menus[role] || []
}
