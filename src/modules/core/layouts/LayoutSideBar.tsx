import { IMenuSideBar } from '@/types'
import { SideBar } from '@/modules/core'

interface IProps {
  children: React.ReactNode
  itemsMenu: IMenuSideBar[]
}

export const LayoutSideBar = (props: IProps) => {
  const { children, itemsMenu } = props
  return (
    <main className="flex">
      <SideBar menuAside={itemsMenu} />
      <article className="w-full flex flex-col bg-baground max-w-[calc(100%-240px)]">
        {/* <NavBarSideBar /> */}
        <main className="px-4 py-6 bg-gray-100 h-full">{children}</main>
      </article>
    </main>
  )
}
