'use client'
import { Button } from '@nextui-org/button'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { ILanguages } from '@/types'
import { CardProgram } from '@/modules/client'

interface IProps {
  listPrograms: ILanguages[]
}

export const LanguagesSection = (props: IProps) => {
  const { listPrograms } = props

  return (
    <main className="container section flex flex-col justify-center items-center gap-12">
      <header className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl lg:text-4xl">
          Matricúlate en cualquiera de nuestros programas disponibles
        </h1>
        <h3>Programas disponibles en el CIUNAP</h3>
      </header>
      <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-4">
        {listPrograms?.length === 0 ? (
          <>
            <div>
              <h1>
                No hay programas disponibles en este momento, por favor
                inténtelo más tarde
              </h1>
            </div>
          </>
        ) : (
          listPrograms?.slice(0, 4).map((language) => (
            <CardProgram
              key={language.id}
              name={language.nombre}
              code={language.codigo}
              description=""
              image={
                language.image ||
                'https://img.freepik.com/vector-gratis/fondo-libro-ingles-dibujado-mano_23-2149483336.jpg?w=1380&t=st=1714156896~exp=1714157496~hmac=20d9120bfc74ed31141aa034d58bf6ec64cfda2eab4e6064323387fef93aa1e5'
              }
              href={`/idiomas/${language.nombre}`}
            />
          ))
        )}
      </section>
      <div className="">
        <Button
          variant="light"
          endContent={<IconArrowRight stroke={1} />}
          as={Link}
          href="/idiomas"
          radius="full"
        >
          Ver todos los idiomas
        </Button>
      </div>
    </main>
  )
}
