'use client'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import {
  IconDashboard,
  IconBook2,
  IconUsers,
  IconFileZip,
  IconWorld,
  IconUser,
  IconCreditCardPay,
  IconChartBar,
  IconNetwork,
  IconHome,
  IconCalendarMonth,
  IconPencil,
} from '@tabler/icons-react'
import { IAsideMenu, LayoutPanel } from '@/modules/admin'
import { getMenuByRole, getSubMenuByRole, subMenus } from '@/modules/core'
import { Role } from '@/types'

const size = 42
const stroke = 1.5

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const navBarMenuAdmin: IAsideMenu[] = [
    {
      id: 1,
      key: '',
      title: 'Dashboard',
      link: '/admin',
      icon: (
        <IconDashboard
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 2,
      key: 'idiomas',
      title: 'Idiomas',
      link: '/admin/idiomas',
      icon: (
        <IconWorld
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 2,
      key: 'cursos',
      title: 'Cursos',
      link: '/admin/cursos',
      icon: (
        <IconBook2
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 5,
      key: 'expedientes',
      title: 'Expedientes',
      link: '/admin/expedientes',
      icon: (
        <IconFileZip
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 3,
      key: 'personas',
      title: 'Personas',
      link: '/admin/personas',
      icon: (
        <IconUsers
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 4,
      key: 'pagos',
      title: 'Pagos',
      link: '/admin/pagos',
      icon: (
        <IconCreditCardPay
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 6,
      key: 'portal',
      title: 'Portal',
      link: '/admin/portal',
      icon: (
        <IconNetwork
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 7,
      key: 'reportes',
      title: 'Reportes',
      link: '/admin/reportes',
      icon: (
        <IconChartBar
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 8,
      key: 'perfil',
      title: 'Perfil',
      link: '/admin/perfil',
      icon: (
        <IconUser
          size={size}
          stroke={stroke}
        />
      ),
    },
  ]

  const navBarMenuStudent: IAsideMenu[] = [
    {
      id: 1,
      key: '',
      title: 'Inicio',
      link: '/student',
      icon: (
        <IconHome
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 6,
      key: 'Matricula',
      title: 'Matricula',
      link: '/student/inscripcion',
      icon: (
        <IconPencil
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 2,
      key: 'programas',
      title: 'Idiomas',
      link: '/student/programas',
      icon: (
        <IconWorld
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 3,
      key: 'cursos',
      title: 'Cursos',
      link: '/student/cursos',
      icon: (
        <IconBook2
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 4,
      key: 'calendario',
      title: 'Calendario',
      link: '/student/calendario',
      icon: (
        <IconCalendarMonth
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 5,
      key: 'perfil',
      title: 'Perfil',
      link: '/student/perfil',
      icon: (
        <IconUser
          size={size}
          stroke={stroke}
        />
      ),
    },
  ]

  const navBarMenuTeacher: IAsideMenu[] = [
    {
      id: 1,
      key: '',
      title: 'Inicio',
      link: '/teacher',
      icon: (
        <IconHome
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 2,
      key: 'cursos',
      title: 'Cursos',
      link: '/teacher/cursos',
      icon: (
        <IconBook2
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 3,
      key: 'calendario',
      title: 'Calendario',
      link: '/teacher/calendario',
      icon: (
        <IconCalendarMonth
          size={size}
          stroke={stroke}
        />
      ),
    },
    {
      id: 4,
      key: 'perfil',
      title: 'Perfil',
      link: '/teacher/perfil',
      icon: (
        <IconUser
          size={size}
          stroke={stroke}
        />
      ),
    },
  ]

  const role = pathname.split('/')[1] as Role

  const navBarMenu: { [role: string]: IAsideMenu[] } = {
    admin: navBarMenuAdmin,
    student: navBarMenuStudent,
    teacher: navBarMenuTeacher,
  }

  const menu = getMenuByRole(role, navBarMenu)
  const subMenu = getSubMenuByRole(role, subMenus)

  return (
    <>
      <LayoutPanel
        navBarMenu={menu}
        dataMenuBar={subMenu}
      >
        {children}
      </LayoutPanel>
      <ToastContainer />
    </>
  )
}
