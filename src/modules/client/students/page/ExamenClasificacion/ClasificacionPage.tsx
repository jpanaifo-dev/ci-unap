import Image from 'next/image'
import { imgBecaUniversity } from '@/assets'

export const ClasificacionPage = () => {
  return (
    <>
      <main className="pt-6 lg:pt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <section className="flex flex-col gap-4 border rounded-lg p-6 shadow-lg h-fit">
          <header>
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-success-700">
              Sobre los exámenes de clasificación
            </h1>
          </header>
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ul className="list-disc list-inside space-y-4">
              <li>
                <span className="font-bold">
                  Fechas de exámenes de ubicación:
                </span>{' '}
                Los exámenes de ubicación se realizan el último día hábil de
                cada mes, solo si el interesado lo requiere.
              </li>
              <li>
                <span className="font-bold">Proceso de solicitud:</span> Este
                examen se lleva a cabo previo pago y presentación del
                comprobante de pago (voucher) en la secretaría.
              </li>
              <li>
                <span className="font-bold">Instrucciones de pago:</span> El
                pago por el examen de ubicación se realiza en el Banco de la
                Nación al código 00000534, y el voucher debe ser entregado en
                las oficinas del CIUNAP.
              </li>
              <li>
                <span className="font-bold">Restricción del examen:</span> El
                examen de ubicación solo se toma antes de que el interesado
                pertenezca a la institución.
              </li>
            </ul>
          </section>
        </section>
        <section className="w-ful flex flex-col justify-end items-end">
          <Image
            src={imgBecaUniversity.src}
            alt="Beca University"
            width={520}
            height={400}
          />
        </section>
      </main>
    </>
  )
}
