import { IInscriptions } from '@/types'
import { capitalize } from '@/utils'
import { Divider } from '@nextui-org/react'

interface IProps {
  data?: IInscriptions
}

const statusData = [
  {
    key: 'abierto',
    label: 'Acta abierta',
    description: 'El acta aún no ha sido cerrada',
    bgClassName: 'bg-primary-100 border-2 text-primary-600 border-primary-200',
  },
  {
    key: 'cerrado',
    label: 'Acta cerrada',
    description: 'El acta ya fue cerrada',
    bgClassName: 'bg-danger-100 border-2 text-danger-600 border-danger-200',
  },
  {
    key: 'Sin publicar',
    label: 'Nota pendiente de publicación',
    description: 'Las notas estas pendientes de publicación',
    bgClassName: 'bg-warning-100  border-2 text-warning-600 border-warning-200',
  },
  {
    key: 'publicado',
    label: 'Notas publicadas',
    description: 'Las notas ya fueron publicadas',
    bgClassName: 'bg-success-100 border-2 text-success-600 border-success-200',
  },
]

function getStatusData(key: string) {
  return statusData.find((item) => item.key === key)
}

export const DetailsData = (props: IProps) => {
  const { data } = props

  const statusClose = getStatusData(data?.is_cerrado ? 'cerrado' : 'abierto')
  const statusPublic = getStatusData(
    data?.is_publicado ? 'publicado' : 'Sin publicar'
  )

  return (
    <>
      <main className="border p-4 rounded-lg flex flex-col gap-4  font-semibold bg-gray-100">
        <section className="flex flex-col gap-1 text-xs uppercase">
          <h2 className="flex gap-1 ">
            Programa : {data?.matricula?.expediente?.programa?.codigo} -{' '}
            {data?.matricula?.expediente?.programa?.nombre}
          </h2>
          <div className="grid grid-cols-2 items-center">
            <h3>Nivel : {data?.grupo?.modulo?.nivel?.nombre}</h3>
            <h3>Modalidad : {data?.grupo?.modulo?.modalidad?.nombre}</h3>
          </div>
          <div className="grid grid-cols-2  items-center">
            <h3>Curso : {data?.grupo?.modulo?.nombre} </h3>
            <h3>Grupo : {data?.grupo?.grupo}</h3>
          </div>
          <h3 className="">
            Docente: {data?.grupo?.docente?.persona?.nombres}
            {data?.grupo?.docente?.persona?.apellido_paterno}
            {data?.grupo?.docente?.persona?.apellido_materno}
          </h3>
        </section>
        <Divider />
        <section className="text-xs flex flex-col gap-1 uppercase">
          <h3>
            N° de documento :{' '}
            {data?.matricula?.expediente?.persona?.numero_documento}
          </h3>
          <h3>
            Estudiante : {data?.matricula?.expediente?.persona?.nombres}
            {data?.matricula?.expediente?.persona?.apellido_paterno}
            {data?.matricula?.expediente?.persona?.apellido_materno}
          </h3>
        </section>
        <Divider />

        <section className="text-xs flex flex-col gap-1">
          <div className="uppercase">
            <h3>
              Promedio :{' '}
              {data?.promedio
                ? data?.promedio
                : 'Aún no tiene registro de notas'}{' '}
            </h3>
          </div>
          <h3 className="uppercase">
            Fecha de cierre de acta :{' '}
            {data?.fecha_cierre_acta ? data?.fecha_cierre_acta : 'Acta abierta'}
          </h3>
        </section>
        {/* <section className="grid grid-cols-2 gap-2 text-xs">
          <div className={`px-4 py-2  rounded-md ${statusClose?.bgClassName}`}>
            <h2 className={`font-bold uppercase`}>{statusClose?.label}</h2>
            <p className="text-tiny text-gray-500 font-normal">
              {capitalize(statusClose?.description ?? '')}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-md ${statusPublic?.bgClassName}`}>
            <h2 className={`font-bold uppercase`}>{statusPublic?.label}</h2>
            <p className="text-tiny text-gray-500 font-normal">
              {capitalize(statusPublic?.description ?? '')}
            </p>
          </div>
        </section> */}
      </main>
    </>
  )
}
