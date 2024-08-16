import { IMenuSideBar } from '@/types'
import { SideBar } from '@/modules/core'
import { NavBar } from '@/modules/admin'

interface IProps {
  children: React.ReactNode
  itemsMenu: IMenuSideBar[]
}

export const LayoutSideBar = (props: IProps) => {
  const { children, itemsMenu } = props

  const handleCloseMenu = () => {
    const sidebar = document.getElementById('sidebar')
    const backdrop = document.getElementById('backdrop')
    if (sidebar) {
      sidebar.classList.add('hidden')
    }
    if (backdrop) {
      backdrop.classList.add('hidden')
    }
  }

  return (
    <main className="flex">
      <div
        id="backdrop"
        className="bg-black/20 w-full h-full fixed top-0 left-0 z-50 bottom-0 hidden transition-opacity duration-75"
        onClick={handleCloseMenu}
      />
      <SideBar menuAside={itemsMenu} />
      <article className="w-full flex flex-col bg-baground lg:max-w-[calc(100%-240px)]">
        <NavBar />
        <main className="px-4 py-6 bg-gray-100 h-full">{children}</main>
      </article>
    </main>
  )
}
