import { imgLocalCiuanp } from '@/assets'
import { IconMap, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'
export const ContactSection = () => {
  return (
    <>
      <main className="relative mb-20">
        <section className="relative">
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/10 backdrop-blur-md"></div>
          <Image
            src={imgLocalCiuanp.src}
            alt="local-ciunap"
            width={1090}
            height={620}
            className="w-full object-cover h-[420px]"
          />
        </section>
        <section className="container bg-white absolute lg:-bottom-16 right-0 left-0 rounded-2xl py-12 sm:py-20 shadow-xl">
          <section className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex gap-3">
              <div>
                <IconMapPin
                  size={52}
                  stroke={1.5}
                  className="text-gray-500"
                />
              </div>
              <div>
                <h1 className="text-greenCiunap-500 font-bold text-2xl">
                  Ubicación
                </h1>
                <p className="text-gray-500">Sgto. Lores 446, Iquitos 16002</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <IconPhone
                  size={52}
                  stroke={1.5}
                  className="text-gray-500"
                />
              </div>
              <div>
                <h1 className="text-greenCiunap-500 font-bold text-2xl">
                  Telefono
                </h1>
                <p className="text-gray-500"> (065) 223019</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <IconMail
                  size={52}
                  stroke={1.5}
                  className="text-gray-500"
                />
              </div>
              <div>
                <h1 className="text-greenCiunap-500 font-bold text-2xl">
                  Correo
                </h1>
                <p className="text-gray-500">ciunap@unapiquitos.edu.pe</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <IconMap
                  size={52}
                  stroke={1.5}
                  className="text-gray-500"
                />
              </div>
              <div>
                <h1 className="text-greenCiunap-500 font-bold text-2xl">
                  Ubicación
                </h1>
                <p className="text-gray-500">Sgto. Lores 446, Iquitos 16002</p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
