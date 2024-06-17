import { DetailsExpediente } from '@/modules/admin/expedientes'
import { IPayments } from '@/types'
import Link from 'next/link'

interface IProps {
  defaultData: IPayments
}

export const DetailsPayments = (props: IProps) => {
  const {
    id,
    concepto,
    nombre_cliente,
    num_documento,
    num_operacion,
    fecha_operacion,
    monto,
    adjunto,
    expediente,
  } = props.defaultData
  return (
    <>
      <main className="flex flex-col gap-4 pt-4">
        <section>
          <header className="font-bold">
            <h1>Datos de la operación</h1>
          </header>
          <section>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">ID</h1>
                <p className="description-sm">: {id}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">Concepto</h1>
                <p className="">: {concepto.concepto}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold  min-w-52">Nombre del cliente</h1>
                <p className="description-sm">: {nombre_cliente}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">Número de documento</h1>
                <p className="description-sm">: {num_documento}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">Número de operación</h1>
                <p className="description-sm">: {num_operacion}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">Fecha de operación:</h1>
                <p className="description-sm">: {fecha_operacion}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold min-w-52">Monto:</h1>
                <p className="description-sm">: {monto}</p>
              </div>
              {adjunto && (
                <div className="flex items-center gap-2">
                  <h1 className="font-bold ">Adjunto:</h1>
                  <Link
                    href={adjunto}
                    target="_blank"
                  >
                    Ver adjunto
                  </Link>
                </div>
              )}
            </div>
          </section>
        </section>
        {expediente && (
          <section>
            <DetailsExpediente dataExp={expediente} />
          </section>
        )}
      </main>
    </>
  )
}
