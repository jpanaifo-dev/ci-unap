'use client'
import { Suspense } from 'react'
import { TableView } from './TableView'
import { GalleryView } from './GalleryView'
import { ListView } from './ListVew'
import { HeaderSection } from './HeaderSection'
import { IGroup, IResApi } from '@/types'
import { useFilterFromUrl } from '@/hooks'

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
        {isTable && <TableView resApi={groupList} />}
        {isList && <ListView resApi={groupList} />}
        {isGallery && <GalleryView resApi={groupList} />}
      </Suspense>
    </>
  )
}
