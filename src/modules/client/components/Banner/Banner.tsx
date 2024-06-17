'use client'
import { Divider, Image } from '@nextui-org/react'
import { imgBanner } from '@/assets'
import { BreadcrumbComponent } from '../Breadcrumbs/Breadcrumbs'
import { usePathname } from 'next/navigation'

import { arrayPage } from './arrayPage'

function getPageDescription(key: string) {
  return arrayPage.find((page) => page.key === key)?.description
}

interface IBanner {
  color?: string
  image?: string
  subtitle?: string
}

export const Banner = (props: IBanner) => {
  const { color, image, subtitle } = props
  const pathname = decodeURIComponent(usePathname())

  //Encaso de tener un guion medio en la url quitarlo
  const path = pathname.split('/').pop()
  const pathSplit = path?.split('-').join(' ')

  const description = getPageDescription(pathname)

  return (
    <>
      <section
        className={`w-full h-[18rem] lg:h-[20rem] relative ${
          color && color !== '' ? color : 'bg-black/60'
        }  `}
      >
        <main className="container text-white flex flex-col justify-between h-full py-4 sm:py-6">
          <BreadcrumbComponent />
          <div className="flex flex-col gap-4 lg:pb-6">
            <h1 className="text-xl sm:text-3xl lg:text-5xl uppercase font-semibold">
              {pathSplit || 'CIUNAP'}
            </h1>
            <Divider className="max-w-xl bg-gray-200 h-0.5" />
            <p>{subtitle || description}</p>
          </div>
        </main>
        <div className="absolute top-0 -z-10 w-full lg:h-[20rem]">
          <Image
            src={image ?? imgBanner.src}
            alt="Banner CIUNAP"
            removeWrapper
            className="w-full h-[18rem] lg:h-[20rem] object-cover "
            radius="none"
          />
        </div>
      </section>
    </>
  )
}
