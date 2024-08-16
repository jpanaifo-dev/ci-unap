'use client'
import { IActions, IColumns, IRows, TableCustom } from '@/modules/admin'
import { IGroup, IResApi } from '@/types'

const col: IColumns[] = [
  {
    key: 'id',
    label: 'Id-Cod',
    align: 'center',
  },
  {
    key: 'fecha_inicio',
    label: 'Fecha de Inicio',
    align: 'center',
  },
  {
    key: 'fecha_final',
    label: 'Fecha de Fin',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Curso',
    align: 'center',
  },
  {
    key: 'group',
    label: 'Grupo',
    align: 'center',
  },
  {
    key: 'level',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'modality',
    label: 'Modalidad',
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

const actions: IActions[] = [
  {
    label: 'Ver curso',
    href: '',
  },
  {
    label: 'Subir / Ver silabo',
    href: 'silabo',
  },
]

interface IProps {
  resApi: IResApi<IGroup> | null
}

export const TableView = (props: IProps) => {
  const { resApi } = props

  const courses: IGroup[] = resApi?.results || []
  const rows: IRows[] = courses?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      fecha_inicio: item.fecha_inicio,
      fecha_final: item.fecha_final,
      name: item.modulo?.nombre,
      group: item?.grupo,
      level: item?.modulo?.nivel?.nombre,
      modality: item?.modulo?.modalidad?.nombre,
      status: item.is_active ? 'Activo' : 'Inactivo',
      actions: 'actions',
    }
  })
  return (
    <>
      <TableCustom
        columns={col}
        actionsList={actions}
        rows={rows || []}
        // searchValue={query}
        // onSearch={handleSearch}
        disableInputSearch
      />
    </>
  )
}
