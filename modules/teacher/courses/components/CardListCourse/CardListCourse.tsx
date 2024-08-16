import { IGroup } from '@/types'
import { Button, Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { IconBook2, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  group: IGroup
  path: string
}

export const CardListCourse = (props: IProps) => {
  const { group, path } = props

  return (
    <>
      <Card
        shadow="sm"
        radius="sm"
      >
        <CardBody className="px-6">
          <main className="flex gap-6">
            <section className="pb-2">
              <IconBook2
                size={60}
                stroke={1.2}
                className="text-gray-400 shadow-lg rounded-lg"
              />
            </section>
            <section>
              <div className="pb-2 flex flex-col gap-2">
                <section className="flex flex-col gap-1">
                  <Chip
                    size="sm"
                    radius="sm"
                    variant="flat"
                    color={group?.is_active ? 'success' : 'danger'}
                  >
                    {group?.is_active ? 'Activo' : 'Inactivo'}
                  </Chip>
                  <div>
                    <p className="text-sm">Resolución: {group?.resolucion}</p>
                    <h1 className="text-2xl font-bold line-clamp-2 uppercase">
                      {group?.modulo?.nombre ?? 'Nombre del curso'}
                    </h1>
                  </div>
                </section>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:gap-4">
                  <p className="text-sm">
                    Del {group?.fecha_inicio} a {group?.fecha_final}
                  </p>
                  <h2 className="text-sm">Grupo : {group?.grupo}</h2>
                  <h2 className="text-sm">
                    Nivel : {group?.modulo?.nivel?.nombre}{' '}
                  </h2>
                  <h2 className="text-sm">
                    Modalidad :{group?.modulo?.modalidad?.nombre}
                  </h2>
                </div>
              </div>
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
