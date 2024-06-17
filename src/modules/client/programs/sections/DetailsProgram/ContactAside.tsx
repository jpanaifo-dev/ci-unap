'use client'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import Link from 'next/link'

export const ContactAside = () => {
  return (
    <>
      <section className="bg-warning-50 rounded-md lg:sticky lg:top-16">
        <main className="p-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-4">
          <header>
            <h1 className="text-xl text-success-700 font-bold">
              Para más información, contáctanos:
            </h1>
          </header>
          <section className="flex flex-col gap-5">
            <div className="flex gap-3 items-start">
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <IconPhone size={24} />
              </div>
              <div>
                <h1>Teléfono</h1>
                <p>
                  <span className="font-bold">(065) 223019</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <IconMail size={24} />
              </div>
              <div>
                <h1>Correo</h1>
                <Link
                  href="mailto:"
                  target="_blank"
                  className="font-bold text-primary-500 hover:underline"
                >
                  correo@correo.com
                </Link>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <IconMapPin size={24} />
              </div>
              <div>
                <h1>Dirección</h1>
                <Link
                  href="https://maps.app.goo.gl/so8FVHtGJU9j54K9A"
                  target="_blank"
                  className="font-bold text-primary-500 hover:underline"
                >
                  Sgto. Lores 446, Iquitos 16002
                </Link>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  )
}
