'use client'
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IPublicationFile } from '@/types'
import { imgCiusaurio } from '@/assets'
import { converDate } from '@/utils'
import { renderContent } from '@/modules/core'

export const CardPublication = (props: IPublicationFile) => {
  const {
    archivo,
    descripcion: descripcionImg,
    publicacion: { titulo, contenido, fecha, tipo, id },
  } = props
  //Eliminar el ultimo slash de baseUrl
  const baseUrl = process.env.API_URL_PROD
    ? process.env.API_URL_PROD.slice(0, -1)
    : ''

  //Quitar el /api de la url
  const baseUrlImg = baseUrl.slice(0, -4)

  const srcImg = archivo ? `${baseUrlImg}${archivo}` : imgCiusaurio.src

  const linkTo = `/publicaciones/${tipo.nombre.toLowerCase()}/${id}`

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.03,
        }}
      >
        <Card
          shadow="none"
          className="w-full "
          isPressable
          // onPress={handleRedirect}
          as={Link}
          href={linkTo}
          target="_blank"
        >
          <CardBody className="p-0 sm:p-4">
            <Image
              src={srcImg}
              alt="image"
              removeWrapper
              className="w-full object-cover rounded-md h-56"
            />
            <section className="flex flex-col w-ful gap-3 pt-3">
              <section className="flex flex-col gap-1">
                <Chip
                  size="sm"
                  radius="sm"
                  variant="flat"
                  color="warning"
                >
                  {tipo.nombre}
                </Chip>
                <h1 className="text-lg sm:text-2xl font-bold uppercase line-clamp-2">
                  {titulo}
                </h1>
                <p className="text-tiny text-gray-500 font-semibold">
                  Creado por: CIUNAP
                </p>
              </section>
            </section>
            <section>
              <div
                className="text-sm sm:text-base text-gray-500 line-clamp-3 font-normal"
                dangerouslySetInnerHTML={renderContent(contenido || '')}
              />
            </section>
          </CardBody>
          <CardFooter>
            <footer className="flex gap-3 justify-start w-full">
              <h2 className="hidden sm:block sm:text-sm text-gray-500">
                F. de publicacion: {converDate(fecha)}
              </h2>
              <h2 className="sm:hidden text-tiny text-gray-500">
                Fecha: {converDate(fecha)}
              </h2>
            </footer>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  )
}
