/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IEnrollment, IInscriptions, IGroup } from '@/types'
import { usePathname } from 'next/navigation'
import { converDate } from '@/utils'

import {
  TableCustom,
  IColumns,
  IRows,
  IActions,
  useInscriptions,
} from '@/modules/admin'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'matricula',
    label: 'Detalle de matricula',
    align: 'center',
  },
  {
    key: 'grupo',
    label: 'Grupo',
    align: 'center',
  },
  {
    key: 'publicado',
    label: 'Publicado',
    align: 'center',
  },
  {
    key: 'cerrado',
    label: 'Acta cerrada',
    align: 'center',
  },
  {
    key: 'retirado',
    label: 'Retirado',
    align: 'center',
  },
  {
    key: 'date',
    label: 'F. cierre de Acta',
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
  { label: 'Editar', href: '' },
  {
    label: 'Detalle',
    href: '',
  },
  {
    label: 'Ver acta',
    href: 'acta',
  },
]

export const ListInscriptions = () => {
  const { getInscriptions, listInscriptions, loading } = useInscriptions()
  const pathname = usePathname()
  const isInscriptions = pathname === '/admin/cursos/inscripciones'
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isInscriptions) {
      getInscriptions({
        num_doc: query,
        page,
      })
    }
  }, [pathname, query])

  const tiposDocs: IInscriptions[] = listInscriptions?.results || []

  const rows: IRows[] = tiposDocs?.map((item) => {
    return {
      key: item?.id,
      matricula: RenderColumMatricula(item.matricula),
      grupo: RenderColumGroup(item.grupo),
      publicado: item?.is_publicado ? 'SÍ' : 'NO',
      retirado: item?.is_retired ? 'SÍ' : 'NO',
      cerrado: item?.is_cerrado ? 'SÍ' : 'NO',
      date:
        item?.fecha_cierre_acta !== ''
          ? converDate(item?.fecha_cierre_acta)
          : 'Acta abierta',
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
          placeholder="Buscar inscripción por número de DNI"
          columns={col}
          rows={rows || []}
          loading={loading}
          actionsList={actions}
          searchValue={query}
          onSearch={handleSearch}
          pagination={{
            count: listInscriptions?.count || 0,
            page,
            rowsPerPage: 15,
            onChangePage: (page) => setPage(page),
          }}
        />
      </section>
    </>
  )
}

const RenderColumMatricula = (item: IEnrollment) => {
  // let nivel
  // if (item?.nivel)

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-tiny text-gray-500">{converDate(item?.fecha)}</p>
        <div>
          <p className="text-tiny">
            {item?.expediente?.persona?.numero_documento}
          </p>
          <h2 className="flex gap-1">
            {item?.expediente?.persona.nombres}{' '}
            {item?.expediente?.persona.apellido_materno}{' '}
            {item?.expediente?.persona.apellido_paterno}
          </h2>
          <h3 className="uppercase font-bold text-gray-500">
            {item?.expediente?.programa?.nombre}
          </h3>
          {/* <p>{item?.nivel}</p> */}
        </div>
      </div>
    </>
  )
}

const RenderColumGroup = (item: IGroup) => {
  return (
    <>
      <div>
        <p>{item?.grupo}</p>
      </div>
    </>
  )
}
