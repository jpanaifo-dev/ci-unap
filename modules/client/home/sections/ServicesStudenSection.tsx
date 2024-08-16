import { Button, Divider } from '@nextui-org/react'
import { imgServicesStuden, imgStudents } from '@/assets/images'
import Image from 'next/image'

const dataServices = [
  {
    id: 1,
    name: 'Trámite documentario',
    description: 'Trámite de documentos para estudiantes',
    href: '/services/tramite-documentario',
  },
  {
    id: 2,
    name: 'Trámite de certificados',
    description: 'Trámite de certificados para estudiantes',
    href: '/services/tramite-certificados',
  },
  {
    id: 3,
    name: 'Pon a prueba tus conocimientos',
    description: 'Prueba tus conocimientos con nuestros exámenes',
    href: '/services/tramite-pagos',
  },
]

export const ServicesStudentSection = () => {
  return (
    <main className="relative h-full">
      <Image
        src={imgStudents.src}
        alt="Estudiantes"
        width={1920}
        height={220}
        className="w-full object-cover lg:h-full lg:max-h-[760px]"
      />
      <section className="bg-success-800/85 pt-14 sm:pt-16 lg:pt-18 absolute bottom-0 right-0 left-0 backdrop-blur-sm">
        <main className="lg:container sm:pt-20 grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Image
              src={imgServicesStuden.src}
              alt="Estudiante"
              width={500}
              height={600}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 order-1 lg:order-1">
            {dataServices?.map((service, i) => (
              <div
                key={service?.id}
                className="text-white border rounded-xl backdrop-opacity-70"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl">{service.name}</h1>
                    <p className="text-sm">{service.description}</p>
                  </div>
                  <div>
                    <Button
                      variant="bordered"
                      className="text-white "
                      radius="full"
                    >
                      Conoce más
                    </Button>
                  </div>
                </div>
                {/* {i !== dataServices.length - 1 && (
                <Divider className="bg-gray-300 h-0.5" />
              )} */}
              </div>
            ))}
          </div>
        </main>
      </section>
    </main>
  )
}
