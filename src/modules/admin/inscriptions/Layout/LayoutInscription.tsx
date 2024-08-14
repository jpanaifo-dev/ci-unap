import { IEnrollment, IGroup } from '@/types'
import { converDate } from '@/utils'
import { Divider } from '@nextui-org/react'
import Image from 'next/image'

interface IProps {
  children: React.ReactNode
  data?: {
    matricula?: IEnrollment
    grupo?: IGroup
  }
}

export const LayoutInscription = (props: IProps) => {
  const { children, data } = props
  const { matricula, grupo } = data || {}
  const {
    id: matriculaId,
    expediente,
    fecha,
    is_active,
    is_retired,
    nivel,
  } = matricula || {}

  const {
    id: grupoId,
    docente,
    aforo,
    fecha_inicio,
    fecha_final,
    grupo: nombreGrupo,
    resolucion,
    modulo,
  } = grupo || {}

  return (
    <main className="flex gap-4">
      <section className="w-1/2 section-panel flex flex-col gap-4">
        {children}
      </section>
      <section className="w-1/2 section-panel flex flex-col">
        {!matriculaId && !grupoId && (
          <div className="flex flex-col w-full justify-center items-center h-full">
            <Image
              src="/svg/not-selected.svg"
              alt="Empty"
              width={200}
              height={200}
            />
            <p className="text-xs text-center max-w-xs font-medium">
              Seleccione una matricula y un grupo para ver los detalles de la
              inscripción
            </p>
          </div>
        )}
        {matriculaId && (
          <div className="flex flex-col gap-5">
            <header>
              <h1 className="text-lg font-bold uppercase text-center text-primary-700">
                Detalles de la Inscripción
              </h1>
            </header>
            <section className="flex flex-col gap-2">
              <header>
                <h2 className="text-sm font-bold uppercase text-primary-700">
                  Matricula
                </h2>
              </header>
              <main className="grid grid-cols-3 gap-1">
                <div className="col-span-1 flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Fecha de matricula</p>
                  <p className="text-xs text-gray-500">Programa</p>
                  <p className="text-xs text-gray-500">Nivel</p>
                  <p className="text-xs text-gray-500">Alumno</p>
                  <p className="text-xs text-gray-500">N° de documento</p>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <p className="text-xs uppercase font-bold">
                    : {converDate(fecha)}{' '}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {expediente?.programa?.nombre}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {nivel?.nombre}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {expediente?.persona?.nombres}{' '}
                    {expediente?.persona?.apellido_paterno}{' '}
                    {expediente?.persona?.apellido_materno}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {expediente?.persona?.numero_documento}
                  </p>
                </div>
              </main>
            </section>
            <section className="flex flex-col gap-2">
              <header className="flex flex-col gap-2">
                <h2 className="text-sm font-bold uppercase text-primary-700">
                  Grupo
                </h2>
              </header>
              <main className="grid grid-cols-3 gap-1">
                <div className="col-span-1 flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Curso</p>
                  <p className="text-xs text-gray-500">Grupo</p>
                  <p className="text-xs text-gray-500">Aforo</p>
                  <p className="text-xs text-gray-500">Fecha de inicio</p>
                  <p className="text-xs text-gray-500">Fecha de fin</p>
                  <p className="text-xs text-gray-500">Docente</p>
                  <p className="text-xs text-gray-500">N° de resolución</p>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <p className="text-xs uppercase font-bold">
                    : {modulo?.nombre}
                  </p>
                  <p className="text-xs uppercase font-bold">: {nombreGrupo}</p>
                  <p className="text-xs uppercase font-bold">: {aforo}</p>
                  <p className="text-xs uppercase font-bold">
                    : {converDate(fecha_inicio)}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {converDate(fecha_final)}
                  </p>
                  <p className="text-xs uppercase font-bold">
                    : {docente?.persona?.nombres}{' '}
                    {docente?.persona?.apellido_paterno}{' '}
                    {docente?.persona?.apellido_materno}
                  </p>
                  <p className="text-xs uppercase font-bold">: {resolucion}</p>
                </div>
              </main>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
