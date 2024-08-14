/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'
import { GalleryView } from './GalleryView'
import { ListView } from './ListVew'
import { HeaderSection } from './HeaderSection'
import { IInscriptions, IResApi } from '@/types'

import { useFilterFromUrl } from '@/hooks'
import Image from 'next/image'

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
    <main>
      <HeaderSection />
      <Suspense fallback={<div>Cargando...</div>}>
        {listInscription.results.length > 0 && (
          <>
            {isList && <ListView resApi={listInscription} />}
            {isGallery && <GalleryView resApi={listInscription} />}
          </>
        )}
        {listInscription.results.length === 0 && (
          <section className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/svg/not-data.svg"
              alt="No hay datos"
              width={300}
              height={300}
            />
            <p className="max-w-lg text-gray-500 text-center text-sm">
              No se encontraron datos, por favor intente con otros filtros o No
              tiene cursos asignados
            </p>
          </section>
        )}
      </Suspense>
    </main>
  )
}
