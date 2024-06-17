'use client'

import { Button, Image } from '@nextui-org/react'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface IProps {
  title: string
  subtitle?: string
  href?: string
  image?: string
  descriptionImage?: string
  isNews?: boolean
  isExternal?: boolean
}

export const TEvents = (props: IProps) => {
  const { title, subtitle, href, image, descriptionImage, isNews, isExternal } =
    props

  return (
    <>
      <main className="w-full h-screen max-h-[calc(100vh-80px)] relative">
        <Image
          src={
            image ||
            'https://portal.andina.pe/EDPfotografia3/Thumbnail/2023/01/06/000924172W.jpg'
          }
          alt="Event Image"
          width={1920}
          height={1080}
          removeWrapper
          isBlurred
          radius="none"
          className="w-full h-full object-cover"
        />
        <section className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
          <main className="w-full h-full flex flex-col justify-center lg:justify-start sm:flex-row gap-4 container items-center ">
            <section className="flex flex-col gap-3 order-2 items-center lg:order-1 lg:items-start w-full">
              <div className="w-full">
                <h1
                  className={`text-4xl lg:text-5xl xl:text-7xl ${
                    isNews ? 'text-success-500' : 'text-warning-400'
                  } font-bold text-center lg:text-start`}
                >
                  {title}
                </h1>
                <p className="text-white text-center lg:text-start">
                  {subtitle}
                </p>
              </div>
              <div>
                <Button
                  as={Link}
                  href={href || '/'}
                  radius="full"
                  variant="shadow"
                  color={isNews ? 'success' : 'warning'}
                  className="text-white"
                  target={isExternal ? '_blank' : '_self'}
                  endContent={<IconArrowRight size={20} />}
                >
                  Ver más
                </Button>
              </div>
            </section>
            <section className="order-1 lg:order-2 flex flex-col items-center lg:max-w-lg relative w-full">
              <Image
                src={
                  image ||
                  'https://portal.andina.pe/EDPfotografia3/Thumbnail/2023/01/06/000924172W.jpg'
                }
                alt="Event Image"
                removeWrapper
                radius="sm"
                isBlurred
                loading="eager"
                className="sm:h-96 w-full  object-cover"
              />
              <div className="bg-black/80 px-4 py-2 rounded-b-lg absolute z-20 bottom-0 left-0 right-0">
                <p className="text-white text-tiny sm:text-xs line-clamp-2">
                  {descriptionImage ||
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, voluptatem.'}
                </p>
              </div>
            </section>
          </main>
        </section>
      </main>
    </>
  )
}
