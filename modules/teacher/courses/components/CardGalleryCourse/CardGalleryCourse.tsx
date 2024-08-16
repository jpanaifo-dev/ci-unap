'use client'
import { IGroup, IInscriptions } from '@/types'
import { Button, Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { IconBook2, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { createCookie } from '@/utils'

interface IProps {
  group: IGroup
  inscription?: IInscriptions
  path: string
}

export const CardGalleryCourse = (props: IProps) => {
  const { group, path } = props

  const handleSetProps = () => {
    const id_docente = group?.docente?.id
  }

  return (
    <>
      <Card
        shadow="sm"
        radius="sm"
      >
        <CardBody className="px-4">
          <main className="flex flex-col gap-3">
            <section className="pb-2 relative">
              <IconBook2
                size={54}
                stroke={1.2}
                className="text-gray-400 shadow-lg rounded-lg"
              />
              <Chip
                size="sm"
                radius="sm"
                className="absolute top-2 right-2"
                variant="flat"
                color={group?.is_active ? 'success' : 'danger'}
              >
                {group?.is_active ? 'Activo' : 'Inactivo'}
              </Chip>
            </section>
            <section>
              <div className="pb-2">
                <p className="text-tiny">Resolución: {group?.resolucion}</p>
                <h1 className="text-xl font-bold line-clamp-2 uppercase">
                  {group?.modulo?.nombre ?? 'Nombre del curso'}
                </h1>
              </div>
              <p className="text-xs">
                Del {group?.fecha_inicio} a {group?.fecha_final}
              </p>
              <h2 className="text-xs">Grupo : {group?.grupo}</h2>
              <h2 className="text-xs line-clamp-1">
                Nivel : {group?.modulo?.nivel?.nombre}{' '}
              </h2>
              <h2 className="text-xs line-clamp-1">
                Modalidad :{group?.modulo?.modalidad?.nombre}
              </h2>
            </section>
          </main>
        </CardBody>
        <CardFooter>
          <div className="flex justify-end w-full py-2">
            <Button
              className="button-dark"
              radius="sm"
              size="sm"
              endContent={<IconArrowRight size={18} />}
              as={Link}
              href={`/${path}/cursos/${group?.id}`}
            >
              Ver curso
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
