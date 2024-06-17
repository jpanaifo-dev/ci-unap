'use client'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IMenuBar } from '@/modules/admin'

function filteredByKey(key: string, data: IMenuBar[]) {
  return data.filter((item) => item.key === key)
}

interface IProps {
  dataMenuBar: IMenuBar[]
}

export const MenuAsideBar = (props: IProps) => {
  const { dataMenuBar } = props
  const pathname = usePathname()
  const tag = pathname.split('/')[2] || ''

  const dataFiltered = filteredByKey(tag, dataMenuBar)

  return (
    <>
      <div className="w-full px-2">
        <Listbox aria-label="list-menu">
          {dataFiltered.map((item, index) => (
            <ListboxSection
              key={index}
              title={item.title}
            >
              {item.items.map((subItem, subIndex) => (
                <ListboxItem
                  key={subIndex}
                  classNames={{
                    base: `${
                      pathname === subItem.key
                        ? 'bg-success-100 data-[hover=true]:bg-success-100 '
                        : ''
                    }`,
                    title: `${
                      pathname === subItem.key
                        ? 'text-success-600 font-semibold'
                        : 'text-black'
                    }`,
                  }}
                  as={Link}
                  href={subItem.key}
                >
                  {subItem.text}
                </ListboxItem>
              ))}
            </ListboxSection>
          ))}
        </Listbox>
      </div>
    </>
  )
}
