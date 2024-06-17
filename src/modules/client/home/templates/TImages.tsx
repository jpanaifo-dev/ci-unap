'use client'
import { TypingAnimation } from '@/modules/magicUi'
import { IPublicationFile } from '@/types'
import { Button, Image } from '@nextui-org/react'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  publication: IPublicationFile
  subtitle?: string
}

export const TImages = (props: IProps) => {
  const { publication, subtitle } = props
  const {
    archivo,
    publicacion: { titulo, tipo, id },
    descripcion: descriptionImage,
  } = publication

  //Eliminar el ultimo slash de baseUrl
  const baseUrl = process.env.API_URL_PROD
    ? process.env.API_URL_PROD.slice(0, -1)
    : ''
  //Quitar el /api de la url
  const baseUrlImg = baseUrl.slice(0, -4)
  const srcImg = archivo
    ? `${baseUrlImg}${archivo}`
    : 'https://portal.andina.pe/EDPfotografia3/Thumbnail/2023/01/06/000924172W.jpg'

  const linkTo = `/publicaciones/${tipo.nombre.toLowerCase()}/${id}`

  return (
    <>
      <main className="w-full h-screen max-h-[calc(100vh-80px)] relative">
        <Image
          src={srcImg}
          alt="Event Image"
          width={1920}
          height={1080}
          removeWrapper
          isBlurred
          radius="none"
          className="w-full h-full object-cover"
        />
        <section className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-black/70 backdrop-blur-sm">
          <main className="w-full h-full flex flex-col justify-center lg:justify-start sm:flex-row gap-4 container items-center ">
            <section className="flex flex-col gap-3 order-2 items-center lg:order-1 lg:items-start w-full">
              <div className="w-full">
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl text-white
                  font-bold text-center lg:text-start line-clamp-3  "
                >
                  {titulo || 'Titulo'}
                </h1>
                {/* <p className="text-white text-center lg:text-start">
                  {subtitle}
                </p> */}
                <TypingAnimation
                  className="text-white text-center lg:text-start font-bold  dark:text-gray-300"
                  text={subtitle || 'Subtitulo'}
                />
              </div>
              <div>
                <Button
                  as={Link}
                  href={linkTo}
                  radius="full"
                  variant="shadow"
                  color="success"
                  className="text-white font-bold"
                  endContent={<IconArrowRight size={20} />}
                >
                  Ver más
                </Button>
              </div>
            </section>
            <section className="order-1 lg:order-2 flex flex-col items-center lg:max-w-lg relative w-full">
              <Image
                src={srcImg}
                alt="Event Image"
                removeWrapper
                radius="sm"
                isBlurred
                loading="eager"
                className="h-full max-h-80 sm:max-h-full sm:h-[520px] w-full  object-cover object-top"
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
