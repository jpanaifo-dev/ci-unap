'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface IProps {
  date: string
}

export const RenderActionColum = (props: IProps) => {
  const { date } = props
  const pathname = usePathname()

  return (
    <section>
      <Link
        href={`${pathname}/${date}`}
        className="text-primary-500 hover:text-primary-300 cursor-pointer underline"
      >
        Ver asistencia
      </Link>
    </section>
  )
}
