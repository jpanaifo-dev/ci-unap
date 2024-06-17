import { IAsideMenu, IMenuBar } from '@/modules/admin'
import { Role } from '@/types'

interface INavBarMenu {
  [role: string]: IAsideMenu[]
}

interface ISubMenu {
  [role: string]: IMenuBar[]
}

export function getMenuByRole(
  role: Role,
  navBarMenu: INavBarMenu
): IAsideMenu[] {
  return navBarMenu[role] || []
}

export function getSubMenuByRole(
  role: Role,
  navBarSubmenu: ISubMenu
): IMenuBar[] {
  return navBarSubmenu[role] || []
}
