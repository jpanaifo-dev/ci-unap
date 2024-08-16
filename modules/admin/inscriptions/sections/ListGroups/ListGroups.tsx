/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IGroup, ITeach } from '@/types'
import { usePathname } from 'next/navigation'

import { TableCustom, IColumns, IRows, useGroups } from '@/modules/admin'
import { colGroupsTable as col } from './columnsGroupTable'
import { TopContent } from './TopContent'

export const ListGroups = () => {
  const { getGroups, listGroups, loading } = useGroups()
  const pathname = usePathname()
  const isInscriptions = pathname === '/admin/cursos/grupos'

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (isInscriptions) {
      getGroups({
        name_modulo: query,
        page,
      })
    }
  }, [pathname, page, query])

  const groups: IGroup[] = listGroups?.results || []

  const rows: IRows[] = groups?.map((item) => {
    return {
      key: item?.id,
      grupo: item?.grupo,
      aforo: item?.aforo,
      fecha_inicio: item?.fecha_inicio,
      fecha_fin: item?.fecha_final,
      docente: RenderColumDocente(item?.docente),
      curso: item?.modulo?.nombre,
      nivel: item?.modulo?.nivel?.nombre,
      modalidad: item?.modulo?.modalidad?.nombre,
      status: item?.is_active,
      actions: 'actions',
    }
  })

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <>
      <section>
        <TableCustom
          placeholder="Buscar grupo por nombre"
          columns={col}
          rows={rows || []}
          loading={loading}
          onSearch={handleSearch}
          searchValue={query}
          topContent={<TopContent />}
        />
      </section>
    </>
  )
}

const RenderColumDocente = (item: ITeach) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="uppercase font-bold text-gray-500">
          {item?.persona?.nombres} {item?.persona?.apellido_paterno}{' '}
          {item?.persona?.apellido_materno}
        </h3>
      </div>
    </>
  )
}
