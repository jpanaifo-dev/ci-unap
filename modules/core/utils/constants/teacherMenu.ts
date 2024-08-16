import { IMenuBar } from '@/modules/admin'

export const subMenuTeacher: IMenuBar[] = [
  {
    id: 1,
    key: 'idiomas',
    title: 'IDIOMAS',
    items: [{ key: '/teacher/idiomas', text: 'Idiomas asignados' }],
  },
  {
    id: 2,
    key: 'cursos',
    title: 'CURSOS',
    items: [{ key: '/teacher/cursos', text: 'Cursos asignados' }],
  },
  {
    id: 3,
    key: 'perfil',
    title: 'PERFIL',
    items: [
      { key: '/teacher/perfil', text: 'Datos personales' },
      { key: '/teacher/perfil/contacto', text: 'Datos de contacto' },
      { key: '/teacher/perfil/cuenta', text: 'Cuenta' },
    ],
  },
]
