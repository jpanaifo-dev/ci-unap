import { IPublication } from '@/types'
import { converDate } from '@/utils'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  publication: IPublication
}

export const CardPublicationList = (props: IProps) => {
  const {
    publication: { id, fecha, titulo, tipo },
  } = props

  const linkTo = `/publicaciones/${tipo.nombre.toLowerCase()}/${id}`

  return (
    <Card
      shadow="none"
      isPressable
      isHoverable
      as={Link}
      href={linkTo}
    >
      <CardBody>
        <main className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">
            {titulo.length > 100 ? titulo.slice(0, 100) + '...' : titulo}
          </h1>
          <p className="text-tiny sm:text-xs">
            Por: <span className="font-bold">Centro de idiomas - CIUNAP</span>
          </p>
        </main>
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
  )
}
