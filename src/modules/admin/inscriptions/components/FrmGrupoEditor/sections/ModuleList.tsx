/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  TableCustom,
  IColumns,
  IRows,
  usePrograms,
  useModules,
} from '@/modules/admin'
import { ILanguages, IModule } from '@/types'

const columns: IColumns[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'nombre',
    label: 'Nombre',
    align: 'center',
  },
  {
    key: 'nivel',
    label: 'Nivel',
    align: 'center',
  },
  {
    key: 'program',
    label: 'Programa',
    align: 'center',
  },
]

interface IProps {
  onSelectModule: (person: IRows) => void
}

export const ModuleList = (props: IProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { onSelectModule } = props
  const { getModules, listModules, loading } = useModules()

  useEffect(() => {
    getModules({
      name: query,
      page,
      nameModality: '',
      nameProgram: '',
    })
  }, [query, page])

  const dataList: IModule[] = listModules?.results ?? []

  const rows: IRows[] = dataList?.map((item: IModule) => {
    return {
      key: item?.id,
      id: item?.id,
      nombre: item?.nombre,
      nivel: item?.nivel?.nombre,
      program: renderColProgram(item?.modalidad?.programa),
    }
  })

  return (
    <>
      <TableCustom
        columns={columns}
        rows={rows}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        selectionMode="single"
        onSelectionChange={(selected) => {
          onSelectModule(selected)
        }}
        loading={loading}
        pagination={{
          count: listModules?.count || 0,
          page,
          onChangePage: (page) => setPage(page),
        }}
      />
    </>
  )
}

const renderColProgram = (program: ILanguages) => {
  return (
    <>
      <p>{program?.nombre}</p>
    </>
  )
}
