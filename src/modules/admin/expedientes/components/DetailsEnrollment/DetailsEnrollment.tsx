import { IEnrollment, ILevel } from '@/types'
import { converDate } from '@/utils'
import { Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  defaultData: IEnrollment
}
export const DetailsEnrollment = (props: IProps) => {
  const {
    id,
    fecha,
    is_active,
    expediente: {
      persona: {
        nombres,
        apellido_materno,
        apellido_paterno,
        numero_documento,
        correo,
        celular,
      },
      programa: { codigo, nombre },
      descuento,
      id: eid,
    },
    is_retired,
  } = props.defaultData

  const nivelData =
    props.defaultData?.nivel !== typeof 'string'
      ? (props.defaultData?.nivel as ILevel)
      : null

  return (
    <>
      <main className="w-full border max-w-6xl p-4 rounded-lg flex flex-col gap-4">
        <header>
          <div>
            <Chip
              aria-label="chip-item"
              variant="flat"
              radius="sm"
              color={is_active ? 'success' : is_retired ? 'warning' : 'danger'}
            >
              {is_active ? 'Activo' : is_retired ? 'Retirado' : 'Inactivo'}
            </Chip>
            <h1 className="font-bold text-2xl">
              Detalles de la matrícula {id}
            </h1>
          </div>
          <div className="pb-3">
            <p className="text-gray-500 text-sm font-bold">
              Fecha de matricula: {converDate(fecha)}
            </p>
            {descuento && <p>Descuento: {descuento?.porcentaje}%</p>}
          </div>
          <Divider aria-label="divider" />
        </header>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <section className="col-span-2 lg:col-span-4">
            <h1 className="text-gray-400 font-semibold text-lg underline">
              Detalles{' '}
            </h1>
          </section>
          <h2>Programa</h2>
          <p className="description-sm">
            : {codigo} - {nombre}
          </p>
          <h2>Nivel</h2>
          <p className="description-sm">: {nivelData?.nombre}</p>
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <section className="col-span-2 lg:col-span-4">
            <h1 className="text-gray-400 font-semibold text-lg underline">
              Detalles del expediente {eid}
            </h1>
          </section>
          <h2>Nombres</h2>
          <p className="description-sm">: {nombres}</p>
          <h2>Apellidos</h2>
          <p className="description-sm">
            : {apellido_paterno + ' ' + apellido_materno}
          </p>
          <h2>N° de documento</h2>
          <p className="description-sm">: {numero_documento}</p>
          <h2>Correo</h2>
          <p className="description-sm">: {correo}</p>
          <h2>Celular</h2>
          <p className="description-sm">: {celular}</p>
        </section>
      </main>
    </>
  )
}
