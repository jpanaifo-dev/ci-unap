'use client'
import { IInscriptions } from '@/types'
import { converDate } from '@/utils'
import {
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface IProps {
  defaultData?: IInscriptions
}

export const DetailsInscriptions = ({ defaultData }: IProps) => {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <Modal
        aria-label="modal"
        isOpen
        size="5xl"
        radius="sm"
        onClose={handleClose}
      >
        <ModalContent>
          <ModalHeader>
            <header>
              <div>
                <Chip
                  variant="flat"
                  radius="sm"
                  size="sm"
                  color={
                    defaultData?.matricula?.is_active ? 'success' : 'danger'
                  }
                >
                  Matricula{' '}
                  {defaultData?.matricula?.is_active ? 'Activo' : 'Inactivo'}
                </Chip>
                <h1 className="font-bold text-2xl">
                  Inscripción N° {defaultData?.id}
                </h1>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold">
                  Fecha de matricula:{' '}
                  {converDate(defaultData?.matricula?.fecha)}
                </p>
              </div>
            </header>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <main className="w-full flex flex-col gap-4 text-sm">
              <section className="flex flex-col gap-1">
                <header>
                  <h1 className="text-gray-500 font-bold">
                    Detalles de matrícula
                  </h1>
                </header>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <h1>Promedio</h1>
                  <p className="description-sm">
                    : {defaultData?.promedio ?? 'Aún no tiene promedio'}
                  </p>
                  <h1>Notas publicadas</h1>
                  <p className="description-sm">
                    : {defaultData?.is_publicado ? 'Publicado' : 'Sin publicar'}
                  </p>
                  <h1>Acta cerrada</h1>
                  <p className="description-sm">
                    : {defaultData?.is_cerrado ? 'Cerrado' : 'Abierto'}
                  </p>
                  <h1>F. cierre de Acta</h1>
                  <p className="description-sm">
                    : {converDate(defaultData?.fecha_cierre_acta)}
                  </p>
                  <h1>Retirado</h1>
                  <p className="description-sm">
                    : {defaultData?.is_retired ? 'Retirado' : 'No retirado'}
                  </p>
                </div>
              </section>
              <section className="flex flex-col gap-1">
                <header>
                  <h1 className="text-gray-500 font-bold">
                    Detalles del Módulo
                  </h1>
                </header>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <h1>Programa</h1>
                  <p className="description-sm">
                    :{' '}
                    {defaultData?.matricula?.expediente?.programa?.nombre ?? ''}
                  </p>
                  <h1>Grupo</h1>
                  <p className="description-sm">
                    : {defaultData?.grupo?.grupo ?? ''}
                  </p>
                  <h1>Fecha de incio y final</h1>
                  <p className="description-sm">
                    : {converDate(defaultData?.grupo?.fecha_inicio)} -{' '}
                    {converDate(defaultData?.grupo?.fecha_final)}
                  </p>
                  <h1>Resolución</h1>
                  <p className="description-sm">
                    : {defaultData?.grupo?.resolucion ?? 'Sin resolución'}
                  </p>
                  <h1>Docente</h1>
                  <p className="description-sm">
                    :{' '}
                    {`${defaultData?.grupo?.docente?.persona?.nombres} ${defaultData?.grupo?.docente?.persona?.apellido_paterno} ${defaultData?.grupo?.docente?.persona?.apellido_materno}`}
                  </p>
                  <h1>Modulo</h1>
                  <p className="description-sm">
                    : {defaultData?.grupo?.modulo?.nombre ?? 'Sin módulo'}
                  </p>
                  <h1>Nivel</h1>
                  <p className="description-sm">
                    : {defaultData?.grupo?.modulo?.nivel?.nombre ?? 'Sin nivel'}
                  </p>
                  <h1>Modalidad</h1>
                  <p className="description-sm">
                    :{' '}
                    {defaultData?.grupo?.modulo?.modalidad?.nombre ??
                      'Sin modalidad'}
                  </p>
                </div>
              </section>
              <section className="flex flex-col gap-1">
                <header>
                  <h1 className="text-gray-500 font-bold">
                    Detalles del expediente
                  </h1>
                </header>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <h1>Nombres</h1>
                  <p className="description-sm">
                    : {defaultData?.matricula?.expediente?.persona?.nombres}
                  </p>
                  <h1>Apellidos</h1>
                  <p className="description-sm">
                    :{' '}
                    {`${defaultData?.matricula?.expediente?.persona?.apellido_materno} ${defaultData?.matricula?.expediente?.persona?.apellido_paterno}`}
                  </p>
                  <h1>N° de documento</h1>
                  <p className="description-sm">
                    :{' '}
                    {
                      defaultData?.matricula?.expediente?.persona
                        ?.numero_documento
                    }
                  </p>
                  <h1>Correo</h1>
                  <p className="description-sm">
                    : {defaultData?.matricula?.expediente?.persona?.correo}
                  </p>
                  <h1>Celular</h1>
                  <p className="description-sm">
                    : {defaultData?.matricula?.expediente?.persona?.celular}
                  </p>
                </div>
              </section>
            </main>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
