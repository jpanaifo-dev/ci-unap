'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

function findValue(value: string) {
  if (value === 'admin') return 'Inicio'
  if (value === 'student') return 'Inicio'
  if (value === 'teacher') return 'Inicio'
}

const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean) // Filtrar elementos vacíos
  let startIndex = 0

  // Verificar si la ruta contiene "admin"
  if (paths.includes('admin')) {
    startIndex = paths.indexOf('admin')
  }

  return paths.slice(startIndex).map((path, index) => {
    return {
      name: path,
      path: paths.slice(startIndex, index + startIndex + 1).join('/'),
    }
  })
}

export const BreadcrumbComponent = () => {
  const pathname = usePathname()

  const isPath =
    pathname === '/student' || pathname === '/teacher' || pathname === '/admin'

  return (
    <header>
      {!isPath && (
        <Breadcrumbs
          aria-label="Breadcrumb navigation"
          className="capitalize"
        >
          {generateBreadcrumbs(pathname).map((breadcrumb, index) => (
            <BreadcrumbItem
              key={index}
              href={'/' + breadcrumb.path}
            >
              {findValue(breadcrumb.name) ?? breadcrumb.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
    </header>
  )
}
