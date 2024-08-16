import { IMenuBar } from '@/modules/admin'

export const subMenuStudent: IMenuBar[] = [
  {
    id: 1,
    key: 'programas',
    title: 'IDIOMAS',
    items: [{ key: '/student/programas', text: 'Mis programas' }],
  },
  {
    id: 2,
    key: 'cursos',
    title: 'IDIOMAS',
    items: [{ key: '/student/cursos', text: 'Mis cursos' }],
  },
  {
    id: 3,
    key: 'perfil',
    title: 'PERFIL',
    items: [
      { key: '/student/perfil', text: 'Datos personales' },
      { key: '/student/perfil/contacto', text: 'Datos de contacto' },
      { key: '/student/perfil/cuenta', text: 'Cuenta' },
    ],
  },
]
