/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { CardProgram, LoadingCardProgram, usePrograms } from '@/modules/client'

export const ProgramsList = () => {
  const { listPrograms, getProgramsActive, loading } = usePrograms()

  useEffect(() => {
    getProgramsActive({
      search: '',
    })
  }, [])

  return (
    <>
      <main>
        <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-4">
          {listPrograms?.results &&
            listPrograms?.results?.length > 0 &&
            listPrograms?.results?.map((language, index) => (
              <CardProgram
                key={index}
                code={language.codigo}
                name={language.nombre}
                description={
                  ' Sumérgete en una experiencia educativa enriquecedora y prepárate para el éxito global inscribiéndote hoy mismo en nuestro centro de idiomas.'
                }
                image={
                  language.image ||
                  'https://img.freepik.com/vector-gratis/fondo-libro-ingles-dibujado-mano_23-2149483336.jpg?w=1380&t=st=1714156896~exp=1714157496~hmac=20d9120bfc74ed31141aa034d58bf6ec64cfda2eab4e6064323387fef93aa1e5'
                }
                href={`idiomas/${language.nombre.toLowerCase()}`}
              />
            ))}

          {loading && <LoadingCardProgram />}
        </section>
      </main>
    </>
  )
}
