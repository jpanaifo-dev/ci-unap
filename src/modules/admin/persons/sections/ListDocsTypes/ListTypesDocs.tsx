/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ITypeDoc } from '@/types'
import { TableCustom, IColumns, IRows, IActions } from '@/modules/admin'
import { useTypeDoc } from '@/modules/admin'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'document',
    label: 'Documento',
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
    label: 'Editar',
    href: '/admin/personas/documentos/',
  },
]

export const ListTypeDocuments = () => {
  const { getTypeDocs, loading, typesDoc } = useTypeDoc()
  const pathname = usePathname()
  const isTypeDoc = pathname === '/admin/personas/documentos'

  useEffect(() => {
    if (isTypeDoc) {
      getTypeDocs()
    }
  }, [pathname])

  const tiposDocs: ITypeDoc[] = typesDoc?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item.id,
      status: item.is_active ? 'Activo' : 'Inactivo',
      document: item.documento,
      actions: 'actions',
    }
  })

  return (
    <div>
      <TableCustom
        disableInputSearch
        columns={col}
        actionsList={actions}
        rows={rows || []}
        loading={loading}
      />
    </div>
  )
}
