'use client'
import { usePathname } from 'next/navigation'
import { Button, Accordion, AccordionItem } from '@nextui-org/react'
import { imgLogoBg } from '@/assets'
import { IMenuSideBar } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

import {
  IconDashboard,
  IconBook2,
  IconUsers,
  IconFileZip,
  IconWorld,
  IconUser,
  IconCreditCardPay,
  IconChartBar,
  IconNetwork,
  IconHome,
  IconCalendarMonth,
  IconPencil,
  IconCash,
  IconSchool,
  IconFileDescription,
  IconMessage,
  IconBlockquote,
} from '@tabler/icons-react'
import { RoleSection } from './RoleSection'

interface IProps {
  menuAside: IMenuSideBar[]
}

const icons = {
  IconDashboard: <IconDashboard size={16} />,
  IconBook2: <IconBook2 size={16} />,
  IconUsers: <IconUsers size={16} />,
  IconFileZip: <IconFileZip size={16} />,
  IconWorld: <IconWorld size={16} />,
  IconUser: <IconUser size={16} />,
  IconCreditCardPay: <IconCreditCardPay size={16} />,
  IconChartBar: <IconChartBar size={16} />,
  IconNetwork: <IconNetwork size={16} />,
  IconHome: <IconHome size={16} />,
  IconCalendarMonth: <IconCalendarMonth size={16} />,
  IconPencil: <IconPencil size={16} />,
  IconCash: <IconCash size={16} />,
  IconSchool: <IconSchool size={16} />,
  IconFileDescription: <IconFileDescription size={16} />,
  IconMessage: <IconMessage size={16} />,
  IconBlockquote: <IconBlockquote size={16} />,
}

function getIcon(icon: string) {
  return icons[icon as keyof typeof icons]
}

function findActiveAccordion(menuAside: IMenuSideBar[], pathname: string) {
  let activeAccordion = ''
  menuAside.forEach((item) => {
    item.items?.forEach((subItem) => {
      if (subItem.href === pathname) {
        activeAccordion = item.id
      }
      subItem.moreItems?.forEach((moreItem) => {
        if (moreItem.href === pathname) {
          activeAccordion = subItem?.id as string
        }
      })
    })
  })
  return activeAccordion
}

export const SideBar = (props: IProps) => {
  const { menuAside } = props
  const pathname = usePathname()

  const activeAccordion = findActiveAccordion(menuAside, pathname) || 'Inicio'

  return (
    <aside
      id="sidebar"
      className="fixed lg:sticky top-0 z-50 w-60 hidden lg:flex  max-w-60 min-w-60 flex-col flex-shrink-0 font-normal bg-success-900 dark:bg-gray-800 h-screen border-r border-gray-200 dark:border-gray-700 transition-width duration-75"
    >
      <header className="w-full">
        <div className="px-4 py-3 h-[80px]">
          <Image
            src={imgLogoBg.src}
            alt="logo"
            width={130}
            height={100}
          />
        </div>
      </header>
      <RoleSection />
      <div className="flex flex-col flex-1 min-h-0 pt-0 dark:bg-gray-800 h-screen max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
        <div className="pb-4">
          {menuAside?.map((item) => (
            <div key={item.id}>
              <h3 className="px-4 text-xs text-stone-400 capitalize dark:text-gray-400">
                {item.section}
              </h3>
              <ul className="my-2">
                {item.items?.map((subItem) =>
                  subItem?.moreItems && subItem?.moreItems.length > 0 ? (
                    <li
                      className="px-4"
                      key={subItem?.id}
                    >
                      <Accordion
                        variant="light"
                        isCompact
                        className="w-full min-w-full px-0"
                        itemClasses={{
                          base: 'text-xs w-full px-0',
                          title: 'text-xs mx-0 font-medium px-0 text-white',
                          content: 'w-full',
                          trigger:
                            'hover:bg-white/20 rounded-lg w-full px-3 text-white',
                        }}
                        defaultExpandedKeys={[activeAccordion]}
                      >
                        <AccordionItem
                          key={subItem.id}
                          title={subItem.title}
                          startContent={<>{getIcon(subItem?.icon as string)}</>}
                        >
                          <ul>
                            {subItem.moreItems.map((moreItem) => (
                              <li key={moreItem.id}>
                                <Button
                                  radius="sm"
                                  size="sm"
                                  fullWidth
                                  startContent={
                                    <>{getIcon(moreItem?.icon as string)}</>
                                  }
                                  as={Link}
                                  href={moreItem.href ?? ''}
                                  className={`flex items-center justify-start ${
                                    pathname === moreItem.href
                                      ? 'bg-warning-500 font-bold'
                                      : 'text-white'
                                  }`}
                                  variant={
                                    pathname === moreItem.href
                                      ? 'solid'
                                      : 'light'
                                  }
                                >
                                  {moreItem.title}
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  ) : (
                    <li
                      className="px-4"
                      key={subItem.id}
                    >
                      <Button
                        radius="sm"
                        size="sm"
                        fullWidth
                        startContent={<>{getIcon(subItem?.icon as string)}</>}
                        as={Link}
                        href={subItem.href ?? ''}
                        className={`flex items-center justify-start ${
                          pathname === subItem.href
                            ? 'bg-warning-500 font-bold'
                            : 'text-white'
                        }`}
                        variant={pathname === subItem.href ? 'solid' : 'light'}
                      >
                        {subItem.title}
                      </Button>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
