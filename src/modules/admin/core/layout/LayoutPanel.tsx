import Image from 'next/image'
import { logoCiunap } from '@/assets'
import {
  AsideBarMenu,
  BreadcrumbComponent,
  IAsideMenu,
  IMenuBar,
  NavBar,
} from '../../core'

interface IProps {
  children: React.ReactNode
  navBarMenu: IAsideMenu[]
  dataMenuBar: IMenuBar[]
}

export const LayoutPanel = (props: IProps) => {
  const { children, dataMenuBar, navBarMenu } = props
  return (
    <>
      <main className="flex w-full">
        <aside className="hidden lg:block sticky top-0 w-[300px] min-w-[300px] max-w-[300px] border-r h-full">
          <header className="w-full flex flex-col justify-center items-center border-b-1">
            <Image
              src={logoCiunap}
              alt="Logo Ciunap"
              width={160}
              height={160}
              className="py-2 px-4"
            />
          </header>
          <main>
            <AsideBarMenu
              dataMenuBar={dataMenuBar}
              navBarMenu={navBarMenu}
            />
          </main>
        </aside>
        <main className="w-full">
          <NavBar />
          <article className="container w-full px-6 py-2 flex flex-col gap-4">
            <BreadcrumbComponent />
            <main className="">{children}</main>
          </article>
          <footer></footer>
        </main>
      </main>
    </>
  )
}
