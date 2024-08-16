'use client'
import { Image } from '@nextui-org/react'
import { logoCiunap } from '@/assets/images'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react'
import Link from 'next/link'

const socialNetworks = [
  {
    icon: IconBrandFacebook,
    url: 'https://www.facebook.com/p/Centro-de-Idiomas-UNAP-100063612127866/',
  },
  {
    icon: IconBrandInstagram,
    url: 'https://www.facebook.com/p/Centro-de-Idiomas-UNAP-100063612127866/',
  },
  {
    icon: IconBrandLinkedin,
    url: 'https://www.facebook.com/p/Centro-de-Idiomas-UNAP-100063612127866/',
  },
  {
    icon: IconBrandTwitter,
    url: 'https://www.facebook.com/p/Centro-de-Idiomas-UNAP-100063612127866/',
  },
]

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-50 pt-20 pb-8 grid grid-cols-1 gap-12">
        <main className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          <section>
            <Link href="/">
              <Image
                src={logoCiunap.src}
                alt="Logo CIUNAP"
                className="h-24"
                removeWrapper
              />
            </Link>
          </section>
          <section className="grid grid-cols-1 gap-6">
            <h1 className="font-bold text-gray-500 uppercase">
              Centro de Idiomas
            </h1>
            <div className="flex flex-col gap-4 text-neutral-500 font-medium">
              <Link href="/conocenos">
                <h3 className="text-sm">Acerca de nosotros</h3>
              </Link>
              <Link href="/convenios">
                <h3 className="text-sm">Convenios</h3>
              </Link>
              <Link href="/sede">
                <h3 className="text-sm">Sede</h3>
              </Link>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-6">
            <h1 className="font-bold text-gray-500 uppercase">Alumnos</h1>
            <div className="flex flex-col gap-4 text-neutral-500 font-medium">
              <Link href="/examen_clasificacion">
                <h3 className="text-sm">Examen de clasificación</h3>
              </Link>
              <Link href="/reglamentos">
                <h3 className="text-sm">Reglamentos del alumno</h3>
              </Link>
              <Link href="/guia">
                <h3 className="text-sm">Guía de alumnos</h3>
              </Link>
              <Link href="/becas">
                <h3 className="text-sm">Becas</h3>
              </Link>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-6">
            <h1 className="font-bold text-gray-500 uppercase">Ayuda</h1>
            <div className="flex flex-col gap-4 text-neutral-500 font-medium">
              <Link href="/condiciones">
                <h3 className="text-sm">Términos y condiciones</h3>
              </Link>
              <Link href="/FAQ">
                <h3 className="text-sm">Preguntas frecuentes</h3>
              </Link>
              <Link href="/sugerencias">
                <h3 className="text-sm">Buzón de sugerencias</h3>
              </Link>
              <Link href="/contacto">
                <h3 className="text-sm">Contacto</h3>
              </Link>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-gray-500 uppercase">Contáctanos</h1>
              <h3 className="text-sm text-neutral-500 font-medium underline">
                +51 123 456 789
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-gray-500 uppercase">Síguenos en</h1>
              <div className="flex gap-4">
                {socialNetworks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500"
                  >
                    <social.icon size={30} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="container mt-8 text-center text-gray-500">
          <p className="text-sm flex items-center justify-center">
            &copy; CIUNAP. Todos los derechos reservados{' '}
            {new Date().getFullYear()} - OFICINA DE TECNOLOGÍAS DE LA
            INFORMACIÓN - (OTI)
          </p>
        </footer>
      </footer>
    </>
  )
}
