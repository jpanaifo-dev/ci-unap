'use client'
import { usePathname } from 'next/navigation'

import { LayoutSideBar, getMenuByRole } from '@/modules/core'
import { Role, IMenuSideBar } from '@/types'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const menuAdmin: IMenuSideBar[] = [
    {
      id: 'home',
      section: 'Inicio',
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          href: '/admin',
          icon: 'IconDashboard',
        },
      ],
    },
    {
      id: 'admin-cursos',
      section: 'Administración de cursos',
      items: [
        {
          id: 'grupos',
          title: 'Grupos',
          href: '/admin/cursos/grupos',
          icon: 'IconUsers',
        },
        {
          id: 'docentes',
          title: 'Docentes',
          href: '/admin/cursos/docentes',
          icon: 'IconPencil',
        },
      ],
    },
    {
      id: 'administracion',
      section: 'Administración',
      items: [
        {
          id: 'gestion-academica',
          title: 'Gestión académica',
          icon: 'IconBook2',
          moreItems: [
            {
              id: 'idiomas',
              title: 'Idiomas',
              href: '/admin/idiomas',
            },
            {
              id: 'nivel',
              title: 'Niveles',
              href: '/admin/idiomas/niveles',
            },
            {
              id: 'modalidades',
              title: 'Modalidades',
              href: '/admin/idiomas/modalidades',
            },
            {
              id: 'cursos',
              title: 'Cursos',
              href: '/admin/cursos',
            },
          ],
        },
        {
          id: 'gestion-financiera',
          title: 'Gestión financiera',
          href: '/admin/administracion/gestion-financiera',
          icon: 'IconCash',
          moreItems: [
            {
              id: 'pagos',
              title: 'Pagos',
              href: '/admin/pagos',
            },
            {
              id: 'conceptos',
              title: 'Conceptos',
              href: '/admin/pagos/conceptos',
            },

            {
              id: 'descuentos',
              title: 'Descuentos',
              href: '/admin/pagos/descuentos',
            },
          ],
        },
      ],
    },
    {
      id: 'registro',
      section: 'Registros',
      items: [
        {
          id: 'students',
          title: 'Estudiantes',
          icon: 'IconSchool',
          moreItems: [
            {
              id: 'expedientes',
              title: 'Expedientes',
              href: '/admin/expedientes',
            },
            {
              id: 'matriculas',
              title: 'Matrículas',
              href: '/admin/expedientes/matriculas',
            },
            {
              id: 'inscripciones',
              title: 'Inscripciones',
              href: '/admin/expedientes/inscripciones',
            },
          ],
        },
        {
          id: 'personas',
          title: 'Personas',
          href: '/admin/personas',
          icon: 'IconUser',
        },
        {
          id: 'documetos',
          title: 'Tipos de documentos',
          href: '/admin/personas/documentos',
          icon: 'IconFileDescription',
        },
      ],
    },
    {
      id: 'reportes',
      section: 'Reportes',
      items: [
        {
          id: 'reportes',
          title: 'Reportes',
          href: '/admin/reportes',
          icon: 'IconChartBar',
        },
      ],
    },
    {
      id: 'portal',
      section: 'Portal',
      items: [
        {
          id: 'comments',
          title: 'Comentarios',
          href: '/admin/portal/comentarios',
          icon: 'IconMessage',
        },
        {
          id: 'contenido',
          title: 'Contenido',
          icon: 'IconBlockquote',
          moreItems: [
            {
              id: 'archivos',
              title: 'Archivos',
              href: '/admin/portal/archivos',
            },
            {
              id: 'publicaciones',
              title: 'Publicaciones',
              href: '/admin/portal/publicaciones',
            },
            {
              id: 'contenido',
              title: 'Contenido',
              href: '/admin/portal/contenidos',
            },
            {
              id: 'tipo-contenido',
              title: 'Tipo de contenido',
              href: '/admin/portal/tipo-contenido',
            },
          ],
        },
      ],
    },
    {
      id: 'perfil',
      section: 'Perfil',
      items: [
        {
          id: 'perfil',
          title: 'Perfil',
          href: '/admin/perfil',
          icon: 'IconUser',
        },
      ],
    },
  ]
  const menuStudent: IMenuSideBar[] = [
    {
      id: 'home',
      section: 'Inicio',
      items: [
        {
          id: 'inicio',
          title: 'Inicio',
          href: '/student',
          icon: 'IconHome',
        },
      ],
    },
    {
      id: 'gestion-academica',
      section: 'Gestión académica',
      items: [
        {
          id: 'idiomas',
          title: 'Idiomas',
          href: '/student/programas',
          icon: 'IconWorld',
        },
        {
          id: 'cursos',
          title: 'Cursos',
          href: '/student/cursos',
          icon: 'IconBook2',
        },
        {
          id: 'calendario',
          title: 'Calendario',
          href: '/student/calendario',
          icon: 'IconCalendarMonth',
        },
      ],
    },
    {
      id: 'perfil',
      section: 'Perfil',
      items: [
        {
          id: 'perfil',
          title: 'Perfil',
          href: '/student/perfil',
          icon: 'IconUser',
        },
      ],
    },
  ]

  const menuTeacher: IMenuSideBar[] = [
    {
      id: 'home',
      section: 'Inicio',
      items: [
        {
          id: 'inicio',
          title: 'Inicio',
          href: '/teacher',
          icon: 'IconHome',
        },
      ],
    },
    {
      id: 'gestion-academica',
      section: 'Gestión académica',
      items: [
        {
          id: 'cursos',
          title: 'Cursos',
          href: '/teacher/cursos',
          icon: 'IconBook2',
        },
        {
          id: 'calendario',
          title: 'Calendario',
          href: '/teacher/calendario',
          icon: 'IconCalendarMonth',
        },
      ],
    },
    {
      id: 'perfil',
      section: 'Perfil',
      items: [
        {
          id: 'perfil',
          title: 'Perfil',
          href: '/teacher/perfil',
          icon: 'IconUser',
        },
      ],
    },
  ]

  const role = pathname.split('/')[1] as Role

  const menus = {
    admin: menuAdmin,
    student: menuStudent,
    teacher: menuTeacher,
  }

  const itemsMenu = getMenuByRole(role, menus)

  return (
    <>
      <LayoutSideBar itemsMenu={itemsMenu}>{children}</LayoutSideBar>
      <ToastContainer />
    </>
  )
}
