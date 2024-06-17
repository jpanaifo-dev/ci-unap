'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean) // Filtrar elementos vacíos
  return paths.map((path, index) => {
    return {
      name: path,
      path: paths.slice(0, index + 1).join('/'),
    }
  })
}

export const BreadcrumbComponent = () => {
  const pathname = usePathname()
  return (
    <div>
      <Breadcrumbs aria-label="breadcrum">
        <BreadcrumbItem
          aria-label="home"
          href="/"
          key="home"
          classNames={{
            item: 'text-gray-400 capitalize',
          }}
        >
          Inicio
        </BreadcrumbItem>
        {generateBreadcrumbs(pathname).map((breadcrumb, index) => (
          <BreadcrumbItem
            aria-label="breadcrum-item"
            key={index}
            href={'/' + breadcrumb.path}
            classNames={{
              item: 'text-gray-200 capitalize',
            }}
          >
            {breadcrumb.name.toLowerCase().trim().replace(/\s/g, '')}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  )
}
