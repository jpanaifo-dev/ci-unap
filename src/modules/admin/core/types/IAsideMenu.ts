export interface IAsideMenu {
  id: number
  key: string
  title: string
  link: string
  icon: React.ReactNode
}

export interface IMenuBar {
  id: number
  key: string
  title: string
  items: { key: string; text: string }[]
}
