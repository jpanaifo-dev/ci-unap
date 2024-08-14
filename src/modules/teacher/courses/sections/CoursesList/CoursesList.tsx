'use client'
import { Suspense } from 'react'
import { TableView } from './TableView'
import { GalleryView } from './GalleryView'
import { ListView } from './ListVew'
import { HeaderSection } from './HeaderSection'
import { IGroup, IResApi } from '@/types'
import { useFilterFromUrl } from '@/hooks'
import Image from 'next/image'

interface IProps {
  groupList: IResApi<IGroup>
}

export const TeacherCoursesList = (props: IProps) => {
  const { groupList } = props
  const { getParams } = useFilterFromUrl()

  const isTable = getParams('view', '') === 'table'
  const isList = getParams('view', '') === 'list'
  const isGallery = !isTable && !isList

  return (
    <>
      <HeaderSection />
      <Suspense fallback={<div>Loading...</div>}>
        {groupList.results.length > 0 && (
          <>
            {isTable && <TableView resApi={groupList} />}
            {isList && <ListView resApi={groupList} />}
            {isGallery && <GalleryView resApi={groupList} />}
          </>
        )}
        {groupList.results.length === 0 && (
          <div className="flex flex-col justify-center items-center h-96">
            <Image
              src="/svg/not-selected.svg"
              alt="No hay resultados"
              width={240}
              height={240}
            />
            <p className="text-sm text-gray-600">
              No existen cursos asignados | No se encontraron resultados para tu
              búsqueda
            </p>
          </div>
        )}
      </Suspense>
    </>
  )
}
