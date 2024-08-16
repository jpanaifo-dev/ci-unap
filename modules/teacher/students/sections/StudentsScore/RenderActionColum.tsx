'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProps {
  inscription_id: string
}

export const RenderActionColum = (props: IProps) => {
  const { inscription_id } = props
  const pathname = usePathname()
  return (
    <section>
      <Link
        href={`${pathname}/${inscription_id}`}
        className="text-blue-500 hover:text-blue-700 cursor-pointer underline"
      >
        Agregar | ver notas
      </Link>
    </section>
  )
}
