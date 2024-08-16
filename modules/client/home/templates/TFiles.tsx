'use client'
import { TypingAnimation } from '@/modules/magicUi'
import { IPublicationFile } from '@/types'
import { Button } from '@nextui-org/button'
import { IconArrowRight, IconWorldDownload } from '@tabler/icons-react'
import Image from 'next/image'
import { imgBannerFile } from '@/assets'
import { Link } from '@nextui-org/react'

interface IProps {
  publication: IPublicationFile
  subtitle?: string
}

export const TFiles = (props: IProps) => {
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
  const linkFile = archivo ? `${baseUrlImg}${archivo}` : ''

  const linkTo = `/publicaciones/${tipo.nombre.toLowerCase()}/${id}`

  return (
    <>
      <main className="w-full h-screen max-h-[calc(100vh-80px)] relative">
        <Image
          src={imgBannerFile.src}
          alt="Event Image"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <section className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-black/60 backdrop-blur-sm">
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
            <section className="order-1 lg:order-2  flex flex-col items-end lg:max-w-lg relative w-full bg-warning-500 rounded-lg">
              <div className="w-full p-4 flex items-center gap-4">
                <div>
                  <IconWorldDownload
                    size={50}
                    stroke={1.5}
                    className="text-white"
                  />
                </div>
                <div>
                  <h1 className="text-white font-bold uppercase">
                    {descriptionImage}
                  </h1>
                  <Link
                    href={linkFile || ''}
                    target="_blank"
                    download
                    className="text-slate-200 hover:underline "
                    showAnchorIcon
                  >
                    Descargar archivo
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </section>
      </main>
    </>
  )
}
