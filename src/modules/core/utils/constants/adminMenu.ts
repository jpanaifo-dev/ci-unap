import { IMenuBar } from '@/modules/admin'

export const subMenuAdmin: IMenuBar[] = [
  {
    id: 1,
    key: 'idiomas',
    title: 'IDIOMAS',
    items: [
      { key: '/admin/idiomas', text: 'Lista de idiomas' },
      { key: '/admin/idiomas/nuevo', text: 'Añadir idioma' },
    ],
  },
  {
    id: 2,
    key: 'idiomas',
    title: 'MODALIDADES',
    items: [
      { key: '/admin/idiomas/modalidades', text: 'Modalidades' },
      { key: '/admin/idiomas/niveles', text: 'Niveles' },
    ],
  },
  {
    id: 3,
    title: 'PERSONA',
    key: 'personas',
    items: [
      { key: '/admin/personas', text: 'Lista de personas' },
      { key: '/admin/personas/nuevo', text: 'Añadir persona' },
      { key: '/admin/personas/documentos', text: 'Tipo documento' },
      {
        key: '/admin/personas/documentos/nuevo',
        text: 'Añadir tipo documento',
      },
    ],
  },
  {
    id: 5,
    title: 'EXPEDIENTES',
    key: 'expedientes',
    items: [
      { key: '/admin/expedientes', text: 'Lista de expedientes' },
      { key: '/admin/expedientes/nuevo', text: 'Añadir expediente' },
      { key: '/admin/expedientes/matriculas', text: 'Matriculas' },
      { key: '/admin/expedientes/matriculas/nuevo', text: 'Añadir matricula' },
    ],
  },
  {
    id: 6,
    title: 'CURSOS',
    key: 'cursos',
    items: [
      { key: '/admin/cursos', text: 'Lista de cursos' },
      { key: '/admin/cursos/nuevo', text: 'Añadir curso' },
    ],
  },
  {
    id: 7,
    title: 'GRUPOS',
    key: 'cursos',
    items: [
      { key: '/admin/cursos/grupos', text: 'Lista de grupos' },
      { key: '/admin/cursos/grupos/nuevo', text: 'Añadir grupos' },
    ],
  },
  {
    id: 8,
    title: 'INSCRIPCIONES',
    key: 'cursos',
    items: [
      { key: '/admin/cursos/inscripciones', text: 'Inscripciones' },
      {
        key: '/admin/cursos/inscripciones/nuevo',
        text: 'Añadir inscripción',
      },
    ],
  },
  {
    id: 12,
    title: 'DOCENTES',
    key: 'cursos',
    items: [
      { key: '/admin/cursos/docentes', text: 'Lista de docentes' },
      { key: '/admin/cursos/docentes/nuevo', text: 'Añadir docente' },
    ],
  },
  {
    id: 9,
    title: 'Descuentos',
    key: 'expedientes',
    items: [
      { key: '/admin/expedientes/descuentos', text: 'Lista de descuentos' },
      { key: '/admin/expedientes/descuentos/nuevo', text: 'Añadir descuento' },
    ],
  },
  {
    id: 10,
    title: 'PAGOS',
    key: 'pagos',
    items: [
      { key: '/admin/pagos', text: 'Lista de pagos' },
      { key: '/admin/pagos/nuevo', text: 'Añadir pago' },
      { key: '/admin/pagos/conceptos', text: 'Conceptos de pago' },
      { key: '/admin/pagos/conceptos/nuevo', text: 'Añadir concepto' },
    ],
  },
  {
    id: 11,
    title: 'PORTAL',
    key: 'portal',
    items: [
      { key: '/admin/portal/archivos', text: 'Archivos' },
      { key: '/admin/portal/publicaciones', text: 'Publicaciones' },
      {
        key: '/admin/portal/tipo-contenido',
        text: 'Tipo de contenido',
      },
      { key: '/admin/portal/contenidos', text: 'Contenidos' },
    ],
  },
  {
    id: 12,
    title: 'Comentarios',
    key: 'portal',
    items: [
      { key: '/admin/portal/comentarios', text: 'Comentarios' },
      { key: '/admin/portal/comentarios/nuevo', text: 'Añadir comentario' },
    ],
  },
]
