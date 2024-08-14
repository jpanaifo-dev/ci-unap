/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'
import { IProceeding } from '@/types'
import { useStudentsProceeding, CardProgram } from '@/modules/student'
import { AlertCustom } from '@/modules/core'

export const ListPrograms = () => {
  const { getProceedings, proceedings, loading } = useStudentsProceeding()
  useEffect(() => {
    getProceedings({})
  }, [])

  return (
    <main className="flex flex-col gap-5 section-panel">
      <header className="flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Lista de mis programas</h1>
        <AlertCustom
          title="TENER EN CUENTA"
          color="success"
          content={
            <section>
              <p className="">
                En la lista siguiente se muestran los programas en los que estás
                inscrito o ya tienes un expediente creado.
              </p>
            </section>
          }
        />
      </header>
      <main>
        {loading && (
          <section className="flex flex-col gap-5">
            {[0, 4].map((index) => (
              <div key={index}>
                <Skeleton className="w-full h-52 rounded-xl" />
              </div>
            ))}
          </section>
        )}

        {!loading && (
          <>
            {proceedings && proceedings?.results?.length && (
              <>
                <section className="flex flex-col gap-6">
                  {proceedings.results.map((language: IProceeding) => (
                    <CardProgram
                      key={language.id}
                      language={language?.programa}
                    />
                  ))}
                </section>
              </>
            )}
            {proceedings && proceedings?.results?.length === 0 && (
              <section>
                <p className="font-semibold text-gray-400 text-lg">
                  No hay idiomas disponibles
                </p>
              </section>
            )}
          </>
        )}
      </main>
    </main>
  )
}
