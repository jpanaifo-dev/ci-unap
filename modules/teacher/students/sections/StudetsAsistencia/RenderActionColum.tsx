'use client'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { IconDots } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  inscription_id: string
}

export const RenderActionColum = (props: IProps) => {
  const { inscription_id } = props
  const pathname = usePathname()

  return (
    <section>
      <Dropdown
        size="sm"
        radius="sm"
        showArrow
        classNames={{
          content: 'bg-white border border-gray-200 shadow-lg w-[200px]',
          base: 'text-tiny w-[200px] ',
        }}
      >
        <DropdownTrigger>
          <Button
            size="sm"
            variant="light"
            isIconOnly
          >
            <IconDots
              stroke={1.5}
              className="text-gray-500"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="DropdownMenu">
          <DropdownItem
            as={Link}
            href={`${pathname}/${inscription_id}`}
          >
            Registrar asistencia
          </DropdownItem>
          <DropdownItem
            as={Link}
            href={`${pathname}/${inscription_id}/historial`}
          >
            Historial de asistencia
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </section>
  )
}
