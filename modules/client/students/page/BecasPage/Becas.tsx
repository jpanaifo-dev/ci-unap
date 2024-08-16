import Image from 'next/image'
import { imgBecaSchool, imgBecaUniversity } from '@/assets'
import { IDiscount, IResApi } from '@/types'
import { Card, CardBody } from '@nextui-org/react'
import { IconSchool, IconBackpack } from '@tabler/icons-react'

interface IProps {
  discounts: IResApi<IDiscount>
}

export const Becas = (props: IProps) => {
  const { discounts } = props
  return (
    <>
      <main className="section w-full flex flex-col gap-7">
        <header className="flex flex-col gap-1 justify-center items-center">
          <h1 className="font-bold text-lg sm:text-xl lg:text-4xl">
            Nuestras becas más populares
          </h1>
          <p className="text-gray-500 text-lg">
            ¡Conoce las becas que tenemos para ti!
          </p>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="">
            <CardBody className="">
              <div className="w-full p-4 sm:p-6 flex flex-col gap-3">
                <IconBackpack
                  size={60}
                  stroke={1.5}
                  className="text-success-700"
                />
                <h1 className="text-success-700 font-bold text-xl sm:text-3xl">
                  Beca para estudiantes de colegio
                </h1>
                <p>
                  Si eres estudiante de colegio y tienes un buen rendimiento
                  académico puedes postular a nuestra beca, que ofrecemos para
                  que puedas seguir estudiando sin preocupaciones.
                </p>
                <h3 className="font-bold">
                  ¡No dejes pasar esta oportunidad!{' '}
                </h3>
              </div>
            </CardBody>
          </Card>
          <Card className="">
            <CardBody className="">
              <div className="w-full p-4 sm:p-6 flex flex-col gap-3">
                <IconSchool
                  size={60}
                  stroke={1.5}
                  className="text-warning-700"
                />
                <h1 className="text-warning-700 font-bold text-xl sm:text-3xl">
                  Beca para estudiantes de la UNAP
                </h1>
                <p>
                  Si eres estudiante de la Universidad Nacional del Alto Perú,
                  puedes postular a nuestra beca, que ofrecemos para que puedas
                  seguir estudiando sin preocupaciones.
                </p>
                <h3 className="font-bold">
                  ¡No dejes pasar esta oportunidad!{' '}
                </h3>
              </div>
            </CardBody>
          </Card>
        </section>

        <header className="flex flex-col gap-1 justify-center items-center pt-12">
          <h1 className="font-bold text-lg sm:text-xl lg:text-4xl">
            Descuentos disponibles
          </h1>
          <p className="text-gray-500 text-lg">
            Estos son los descuentos que tenemos para ti.
          </p>
        </header>
        <section className="flex flex-col gap-4 items-center justify-center">
          {discounts.results.length === 0 && (
            <div className="h-screen max-h-60">
              <h1 className="font-bold">
                No hay descuentos disponibles en este momento.
              </h1>
            </div>
          )}
          {
            <div className="w-full flex flex-col gap-4 items-center justify-center max-w-3xl">
              {discounts.results.map((discount) => (
                <section
                  key={discount.id}
                  className="flex w-full items-center justify-between border-l-4 border-primary-500 p-4 sm:p-6 bg-primary-50 rounded-lg shadow-md"
                >
                  <div>
                    <h1 className="sm:text-lg font-bold">
                      {discount.descripcion}
                    </h1>
                    <p>Descuento en porcentaje</p>
                  </div>
                  <div>
                    <h1 className="font-black sm:text-xl text-danger-500">
                      {discount.porcentaje} %
                    </h1>
                    <p className="text-gray-500 text-sm">de descuento</p>
                  </div>
                </section>
              ))}
            </div>
          }
        </section>
      </main>
    </>
  )
}
