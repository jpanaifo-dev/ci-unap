'use client'
import { IGroup } from '@/types'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { CourseDetails, DetailsHeader } from '@/modules/teacher'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { IconDoorExit } from '@tabler/icons-react'

const dataLinks = [
  { title: 'Inicio', path: '' },
  { title: 'Participantes', path: 'participantes' },
  { title: 'Asistencia', path: 'asistencia' },
  { title: 'Calificación', path: 'calificacion' },
]

export const LayoutCourseModal = ({
  children,
  dataGroup,
}: {
  children: React.ReactNode
  dataGroup: IGroup
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClose = () => {
    router.push('/student/cursos')
  }

  return (
    <Modal
      isOpen
      size="full"
      onClose={handleClose}
      closeButton={
        <div>
          <Button
            radius="sm"
            endContent={<IconDoorExit size={20} />}
            onPress={handleClose}
            color="secondary"
            className="font-bold"
          >
            Salir
          </Button>
        </div>
      }
      classNames={{
        closeButton:
          'bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent',
      }}
    >
      <ModalContent>
        <ModalHeader className="bg-gray-800">
          <DetailsHeader
            title={dataGroup?.modulo?.nombre}
            content={
              <div className="flex gap-2 text-gray-400 text-sm">
                <p>Grupo: {dataGroup?.grupo}</p> -
                <p>Nivel: {dataGroup?.modulo?.nivel?.nombre}</p>-
                <p>Modalidad: {dataGroup?.modulo?.modalidad?.nombre}</p>
              </div>
            }
          />
        </ModalHeader>
        <Divider />
        <ModalBody>
          <main className="flex gap-2 h-full">
            <aside className="hidden lg:block max-w-sm w-full border-r py-2">
              <CourseDetails dataGroup={dataGroup} />
            </aside>
            <main className="w-full">
              <section>
                <Tabs
                  aria-label="tabs"
                  variant="underlined"
                  selectedKey={pathname}
                >
                  {dataLinks.map((link) => (
                    <Tab
                      aria-label="tab"
                      key={`/student/cursos/${dataGroup?.id}/${link.path}`}
                      title={link.title}
                      as={Link}
                      href={
                        `/student/cursos/${dataGroup?.id}/${link.path}` ?? `#`
                      }
                    />
                  ))}
                </Tabs>
              </section>
              <section className="p-4">{children}</section>
            </main>
          </main>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
