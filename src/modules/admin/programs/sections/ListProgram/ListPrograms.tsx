/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { ILanguages } from '@/types'
import { Input, Skeleton } from '@nextui-org/react'
// import { IconSearch } from '@tabler/icons-react'
import { CardProgram } from '../../components'
import { usePrograms } from '../../hooks'

export const ListPrograms = () => {
  const { listPrograms, getLanguages, loading } = usePrograms()

  useEffect(() => {
    getLanguages()
  }, [])

  return (
    <>
      {/* <section className="pb-4 ">
        <div className="w-full max-w-sm">
          <Input
            aria-label="Buscar idioma..."
            placeholder="Escribir para buscar idioma..."
            radius="sm"
            variant="bordered"
            startContent={<IconSearch size={20} />}
          />
        </div>
      </section> */}
      <main>
        {loading && (
          <section className="grid grid-cols-4 gap-6">
            {[0, 4].map((index) => (
              <div key={index}>
                <Skeleton className="w-full h-32 rounded-xl" />
              </div>
            ))}
          </section>
        )}

        {!loading && (
          <>
            {listPrograms && listPrograms?.results?.length && (
              <>
                <section className="grid grid-cols-4 gap-6">
                  {listPrograms.results.map((language: ILanguages) => (
                    <CardProgram
                      key={language.id}
                      language={language}
                    />
                  ))}
                </section>
              </>
            )}
            {listPrograms && listPrograms?.results?.length === 0 && (
              <section>
                <p className="font-semibold text-gray-400 text-lg">
                  No hay idiomas disponibles
                </p>
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}
