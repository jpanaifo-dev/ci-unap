'use client'
import { IPublicationType, IResApi } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProps {
  typesPublications: IResApi<IPublicationType>
}

export const PublicationsTypes = (props: IProps) => {
  const { typesPublications } = props
  const pathname = usePathname()

  return (
    <>
      <section className="py-4">
        <h1 className="font-bold">Tipos de publicaciones</h1>
      </section>
      <ul>
        <Link
          className={`border-l-4
            ${
              pathname === `/publicaciones`
                ? 'border-primary-500 bg-primary-100'
                : 'border-gray-300'
            }
            hover:border-blue-500
            cursor-pointer
            transition-colors
            duration-300
            ease-in-out
            flex`}
          href={`/publicaciones`}
        >
          <section className="p-2">
            <h1 className={`uppercase`}>Todas</h1>
          </section>
        </Link>
        {typesPublications.results.map((type) => (
          <Link
            key={type.id}
            className={`
                border-l-4
                ${
                  pathname === `/publicaciones/${type.nombre.toLowerCase()}`
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-gray-300'
                }
                hover:border-blue-500
                cursor-pointer
                transition-colors
                duration-300
                ease-in-out
                flex
            `}
            href={`/publicaciones/${type.nombre.toLowerCase()}` || '#'}
          >
            <section className="p-2">
              <h1 className={`uppercase`}>{type.nombre}</h1>
            </section>
          </Link>
        ))}
      </ul>
    </>
  )
}
