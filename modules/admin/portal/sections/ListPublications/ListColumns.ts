import { IActions, IColumns } from '@/modules/admin'

export const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'titulo',
    label: 'Titulo',
    align: 'center',
  },
  {
    key: 'contenido',
    label: 'Contenido',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha de publicacion',
    align: 'center',
  },
  {
    key: 'tipo',
    label: 'Tipo de publicacion',
    align: 'center',
  },
  {
    key: 'banner',
    label: 'Visualizar en banner',
    align: 'center',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },

  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]

export const actions: IActions[] = [
  {
    label: 'Editar',
    href: '',
  },
  {
    label: 'Añadir archivos',
    href: 'contenido',
  },
]
