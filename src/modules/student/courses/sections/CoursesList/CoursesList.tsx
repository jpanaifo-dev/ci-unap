/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'

import { GalleryView } from './GalleryView'
import { ListView } from './ListVew'
import { HeaderSection } from './HeaderSection'
import { IInscriptions, IResApi } from '@/types'

import { useFilterFromUrl } from '@/hooks'

interface IProps {
  listInscription: IResApi<IInscriptions>
}

export const StundentCoursesList = (props: IProps) => {
  const { listInscription } = props
  const { getParams } = useFilterFromUrl()

  // const isTable = searchParams.get('view') === 'table'
  const isTable = getParams('view', '') === 'table'
  const isList = getParams('view', '') === 'list'
  const isGallery = !isTable && !isList

  return (
    <>
      <HeaderSection />
      {isList && <ListView resApi={listInscription} />}
      {isGallery && <GalleryView resApi={listInscription} />}
    </>
  )
}
