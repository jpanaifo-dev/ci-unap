import { IProceeding } from '@/types'
import { calcYearsAge } from '@/utils'

interface IDetailsExpedienteProps {
  dataExp: IProceeding
}

export const DetailsExpediente = ({ dataExp }: IDetailsExpedienteProps) => {
  const {
    persona: {
      tipo_documento: { documento },
      numero_documento,
      nombres,
      apellido_paterno,
      apellido_materno,
      ocupacion,
      correo,
      celular,
      fecha_nacimiento,
      sexo,
      lugar_nacimiento,
      direccion,
      distrito,
      provincia,
    },
    programa: { codigo, nombre },
  } = dataExp

  return (
    <>
      <section className="pb-8">
        <main className="flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <header>
              <h1 className="text-gray-500 font-bold">Datos del estudiante</h1>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <p>{documento}</p>
                <p className="text-gray-500">: {numero_documento}</p>
              </div>
              <div></div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Nombres</p>
                <p className="text-gray-500">: {nombres}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Apellidos</p>
                <p className="text-gray-500">
                  : {apellido_paterno} {apellido_materno}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p>Ocupacion</p>
                <p className="text-gray-500">: {ocupacion}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Correo</p>
                <p className="text-gray-500">: {correo}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Celular</p>
                <p className="text-gray-500">: {celular} </p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Fecha de nacimiento</p>
                <p className="text-gray-500">: {fecha_nacimiento}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Edad</p>
                <p className="text-gray-500">
                  : {calcYearsAge(fecha_nacimiento)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Sexo</p>
                <p className="text-gray-500">: {sexo}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Lugar de nacimiento</p>
                <p className="text-gray-500">: {lugar_nacimiento}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Dirección</p>
                <p className="text-gray-500">: {direccion}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Distrito</p>
                <p className="text-gray-500">: {distrito}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 items-start">
                <p>Provincia</p>
                <p className="text-gray-500">: {provincia}</p>
              </div>
            </section>
          </section>
          <section className="flex flex-col gap-2">
            <header>
              <h1 className="text-gray-500 font-bold">Datos del programa</h1>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <p>Programa</p>
                <p className="text-gray-500">
                  : {codigo} - {nombre}
                </p>
              </div>
            </section>
          </section>
        </main>
      </section>
    </>
  )
}
