export interface IMenuItem {
  id: string
  title: string
  href?: string | null
  moreItems?: IMenuItem[]
  icon?: string
}

export interface IMenuSideBar {
  id: string
  section: string
  items: IMenuItem[]
}
