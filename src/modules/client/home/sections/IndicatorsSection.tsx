'use client'
import { imgMapXs } from '@/assets'
import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'
import {
  IconFileText,
  IconTextGrammar,
  IconCalendarMonth,
} from '@tabler/icons-react'
import Link from 'next/link'

export const IndicatorsSection = () => {
  return (
    <>
      <section className="bg-success-700">
        <main className="flex flex-col lg:flex-row gap-6 py-12 items-center justify-between container">
          <div className="">
            <h3 className="text-white max-w-xs sm:text-lg font-semibold">
              Estudia con nosotros, sé parte del Centro de Idiomas - UNAP
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
            <section className="flex gap-3">
              <div className="bg-white shadow-medium rounded-lg p-1 w-15 h-15 ">
                <IconCalendarMonth
                  size={52}
                  stroke={1.5}
                  className="text-success-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-white">Calendario académico</h1>
                <Link
                  className="text-tiny text-white underline"
                  href="#"
                  target="_blank"
                >
                  Descarga el calendario académico actual
                </Link>
              </div>
            </section>
            <section className="flex gap-3">
              <div className="bg-white shadow-medium rounded-lg p-1 w-15 h-15">
                <IconTextGrammar
                  size={52}
                  stroke={1.5}
                  className="text-success-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-white">
                  Brochure del estudiante
                </h1>
                <Link
                  className="text-tiny text-white underline"
                  href="#"
                  target="_blank"
                >
                  Descarga nuestra guía para el estudiante
                </Link>
              </div>
            </section>
            <section className="flex gap-3">
              <div className="bg-white shadow-medium rounded-lg p-1 w-15 h-15">
                <IconFileText
                  size={52}
                  stroke={1.5}
                  className="text-success-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-white">Nuestros reglamentos</h1>
                <Link
                  className="text-tiny text-white underline"
                  href="#"
                  target="_blank"
                >
                  Descarga nuestros reglametos y mantente al tanto.
                </Link>
              </div>
            </section>

            {/* <Card
              shadow="none"
              radius="sm"
              isHoverable
              isPressable
              fullWidth
            >
              <CardFooter className="flex gap-2">
                <div className="">
                  <IconFileText
                    size={52}
                    stroke={1}
                    className="text-gray-400"
                  />
                </div>
                <div className="w-full">
                  <h1>Proceso de matrícula</h1>
                </div>
              </CardFooter>
            </Card>
            <Card
              shadow="none"
              radius="sm"
              isHoverable
              fullWidth
              isPressable
            >
              <CardFooter className="flex gap-4">
                <div>
                  <IconTextGrammar
                    size={52}
                    stroke={1}
                    className="text-gray-400"
                  />
                </div>
                <h1>Inscripción a examen de clasificación</h1>
              </CardFooter>
            </Card>
            <Card
              shadow="none"
              radius="sm"
              isHoverable
              fullWidth
              isPressable
            >
              <CardFooter className="">
                <div>
                  <IconCalendarMonth
                    size={52}
                    stroke={1}
                    className="text-gray-400"
                  />
                </div>
                <h1>Calendario académico</h1>
              </CardFooter>
            </Card> */}
          </div>
          <div>
            <Image
              src={imgMapXs.src}
              alt="Mapa de la UNAP"
              width={200}
              height={100}
            />
          </div>
        </main>
      </section>
    </>
  )
}
