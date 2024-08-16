import { IPerson } from '@/types'
import { Divider } from '@nextui-org/react'

interface IProps {
  person: IPerson
}

import React from 'react'

interface IInfoItemProps {
  label: string
  value: string
}

const InfoItem: React.FC<IInfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex gap-3">
      <h2 className="font-semibold w-full max-w-48 text-sm">
        {label}{' '}
      </h2>
      <p className="text-sm text-gray-500">: {value}</p>
    </div>
  )
}

export default InfoItem

export const InfoData = (props: IProps) => {
  const {
    person: {
      nombres,
      apellido_paterno,
      apellido_materno,
      sexo,
      estado_civil,
      ocupacion,
      is_trabajador,
      tipo_documento,
      numero_documento,
      fecha_nacimiento,
      lugar_nacimiento,
      pais,
      region,
      provincia,
      distrito,
      direccion,
      correo,
      celular,
    },
  } = props
  return (
    <>
      <section className="w-full flex flex-col gap-4">
        <header className="w-full">
          <h2 className="text-lg font-bold">Información personal</h2>
          <Divider />
        </header>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="grid grid-cols-1 gap-3">
            <InfoItem
              label="Nombres"
              value={nombres}
            />
            <InfoItem
              label="Apellidos"
              value={`${apellido_paterno} ${apellido_materno}`}
            />
            <InfoItem
              label="Sexo"
              value={sexo || 'No especificado'}
            />
            <InfoItem
              label="Estado civil"
              value={estado_civil?.estado}
            />
            <InfoItem
              label="Ocupación"
              value={ocupacion}
            />
            <InfoItem
              label="Trabajador"
              value={is_trabajador ? 'Si' : 'No'}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <InfoItem
              label="Tipo de documento"
              value={tipo_documento?.documento}
            />
            <InfoItem
              label="N. de documento"
              value={numero_documento}
            />
            <InfoItem
              label="Fecha de nacimiento"
              value={fecha_nacimiento}
            />
            <InfoItem
              label="Lugar de nacimiento"
              value={lugar_nacimiento}
            />
            <InfoItem
              label="País"
              value={pais}
            />
            <InfoItem
              label="Región"
              value={region}
            />
            <InfoItem
              label="Provincia"
              value={provincia}
            />
            <InfoItem
              label="Distrito"
              value={distrito}
            />
          </div>
        </section>
      </section>
      <section className="w-full flex flex-col gap-4">
        <header className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Información de contacto</h2>
          <Divider />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-3">
            <InfoItem
              label="Dirección"
              value={direccion}
            />
            <InfoItem
              label="Correo"
              value={correo}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <InfoItem
              label="Celular"
              value={celular}
            />
          </div>
        </div>
      </section>
    </>
  )
}
