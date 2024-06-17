'use client'

import { ScrollShadow, Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { MenuAsideBar } from './MenuAsideBar'
import { IAsideMenu, IMenuBar } from '../../types'

interface IProps {
  navBarMenu: IAsideMenu[]
  dataMenuBar: IMenuBar[]
}

function splitPathName(value: string) {
  const pathname = value.split('/')
  return pathname[2] || ''
}

export const  AsideBarMenu = (props: IProps) => {
  const { dataMenuBar, navBarMenu } = props
  const pathname = usePathname()
  const path = splitPathName(pathname)

  return (
    <>
      <section className="h-full flex">
        <ScrollShadow
          hideScrollBar
          className="w-full max-w-28 min-w-28 h-screen max-h-[calc(100vh-76px)]"
        >
          <Tabs
            aria-label="tabs"
            isVertical
            variant="underlined"
            classNames={{
              base: 'h-screen max-h-[calc(100vh-75px)]',
              panel: 'bg-blue-500',
              tab: 'py-8',
              cursor: 'bg-white',
              tabContent:
                'uppercase font-bold text-gray-200/60 group-data-[selected=true]:text-white text-xs',
              wrapper: 'bg-greenCiunap-500',
            }}
            selectedKey={path}
          >
            {navBarMenu.map((item) => (
              <Tab
                key={item.key ?? ''}
                title={
                  <div className="flex flex-col items-center">
                    {item.icon}
                    {item.title}
                  </div>
                }
                as={Link}
                href={item.link}
              />
            ))}
          </Tabs>
        </ScrollShadow>
        <MenuAsideBar dataMenuBar={dataMenuBar} />
      </section>
    </>
  )
}
