import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IGroupAuth, IUserData } from './types'

type Group = 'ADMINISTRATIVO' | 'ADMINISTRADOR' | 'DOCENTE' | 'ALUMNO'

const APP_NAME = process.env.APP_NAME

// Define las rutas y los roles permitidos
const routePermissions: Record<string, Group[]> = {
  '/admin': ['ADMINISTRATIVO', 'ADMINISTRADOR'],
  '/teacher': ['DOCENTE'],
  '/student': ['ALUMNO'],
}

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(`${APP_NAME}_user`)?.value
  const dataUser: IUserData = currentUser ? await JSON.parse(currentUser) : null

  const groupsParsed: IGroupAuth[] = dataUser
    ? await JSON.parse(dataUser?.groups as unknown as string)
    : []
  const isAuthenticated = currentUser !== undefined

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Obtener la ruta solicitada
  const { pathname } = request.nextUrl

  // Verificar los permisos basados en la ruta
  for (const [route, allowedGroups] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      const hasPermission = groupsParsed?.some((group) =>
        allowedGroups.includes(group.name.toUpperCase() as Group)
      )
      if (!hasPermission) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
      break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
}
