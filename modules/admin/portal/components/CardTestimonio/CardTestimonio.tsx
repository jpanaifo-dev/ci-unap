'use client'
import { ITestimony } from '@/types'
import { formatDate } from '@/utils'
import { Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProps {
  item: ITestimony
}

export const CardTestimonio = (props: IProps) => {
  const { item } = props
  const pathname = usePathname()

  return (
    <Link
      href={`/admin/portal/comentarios/${item?.id}`}
      key={item?.id}
      className={`${
        pathname === `/admin/portal/comentarios/${item?.id}`
          ? 'bg-gray-100 border border-gray-200'
          : 'bg-white hover:border hover:bg-gray-50 '
      } flex flex-col gap-4 p-4  rounded-md shadow-md hover:shadow-lg transition-all hover:cursor-pointer`}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400">
          Creado el: {formatDate(item?.fecha)}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">{item?.contenido}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase">
          {item?.persona?.nombres} {item?.persona?.apellido_paterno}
        </p>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            radius="sm"
            variant="flat"
            color={item?.is_public ? 'primary' : 'warning'}
          >
            {item?.is_public ? 'Publico' : 'Oculto'}
          </Chip>
          <Chip
            size="sm"
            radius="sm"
            variant="flat"
            color={item?.is_active ? 'success' : 'danger'}
          >
            {item?.is_active ? 'Activo' : 'Inactivo'}
          </Chip>
        </div>
        <div>
          <Button
            radius="sm"
            size="sm"
            variant="light"
          >
            Detalles
          </Button>
        </div>
      </div>
    </Link>
  )
}
