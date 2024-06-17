'use client'
import { useState } from 'react'
import { ILanguages, IModality, IModule, IResApi } from '@/types'
import { Accordion, AccordionItem, Divider, Selection } from '@nextui-org/react'
import { useFilterFromUrl } from '@/hooks'

interface IProps {
  image: string
  program: ILanguages
  modalities: IResApi<IModality>
  modules: IModule[]
}

function groupByLevel(modules: IModule[]): { [key: string]: IModule[] } {
  return modules.reduce((acc, module) => {
    const levelKey = `Nivel ${module.nivel.nombre}`
    if (!acc[levelKey]) {
      acc[levelKey] = []
    }
    acc[levelKey].push(module)
    return acc
  }, {} as { [key: string]: IModule[] })
}

export const DetailsProgram = (props: IProps) => {
  const { image, program, modalities, modules } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const modalidad = getParams('modalidad', `${modalities.results[0]?.id}`)

  const handleSelectionChange = (key: string | Set<string>) => {
    if (typeof key === 'string') {
      updateFilter('modalidad', key)
    } else {
      updateFilter('modalidad', key.values().next().value)
    }
  }

  const modulesByLevel = groupByLevel(modules)

  return (
    <>
      <main className="flex flex-col gap-5 w-full">
        <section className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Sobre el programa</h1>
          <p>
            Bienvenido al Centro de Idiomas de la UNAP. Ofrecemos una amplia
            variedad de cursos de idiomas para ayudarte a mejorar tus
            habilidades lingüísticas. Nuestros programas están diseñados para
            adaptarse a tus necesidades y objetivos individuales. Ya sea que
            estés interesado en aprender inglés, español, francés o cualquier
            otro idioma, nuestro equipo de profesores altamente capacitados te
            brindará una educación de calidad. ¡Explora nuestras modalidades
            existentes y comienza tu viaje hacia la fluidez en el idioma que
            elijas!
          </p>
        </section>
        <section className="flex flex-col gap-6">
          <header>
            <h1 className="text-2xl font-bold">Modalidades</h1>
            <p>
              Este programa cuenta con un plan de estudios que se divide en
              {modalities.count} modalidades, selecciona una para ver los
              módulos existentes
            </p>
          </header>
          <main>
            {modalities.results.length > 0 ? (
              <Accordion
                variant="bordered"
                selectedKeys={modalidad || ''}
                onSelectionChange={(key) =>
                  handleSelectionChange(key as string | Set<string>)
                }
                disallowEmptySelection
                defaultExpandedKeys={[`${modalities.results[0].id}`]}
              >
                {modalities.results.map((modality: IModality) => (
                  <AccordionItem
                    key={modality.id}
                    title={modality.nombre}
                    subtitle={
                      <div className="flex flex-col gap-1">
                        <p>
                          Estos son los niveles y módulos existentes en esta
                          modalidad, cada módulo cuenta con una duración de 1
                          mes
                        </p>
                        <p>{modality.descripcion}</p>
                      </div>
                    }
                    classNames={{
                      title: 'text-xl font-bold',
                      subtitle: 'text-sm',
                    }}
                  >
                    <section className="p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                      {modules.length > 0 ? (
                        <>
                          {Object.keys(modulesByLevel).map((level) => (
                            <section key={level}>
                              <header className="bg-warning-100 px-4 py-2 rounded-lg">
                                <h1 className="text-lg font-bold uppercase text-gray-500">
                                  {level}
                                </h1>
                              </header>
                              <Divider />
                              <main className="grid">
                                {modulesByLevel[level].map((modul) => (
                                  <section
                                    key={module.id}
                                    className="bg-gray-100 px-4 py-2"
                                  >
                                    <p>
                                      Módulo : <span>{modul.nombre}</span>
                                    </p>
                                  </section>
                                ))}
                              </main>
                            </section>
                          ))}
                        </>
                      ) : (
                        <div className="p-2">
                          <p className="text-lg font-bold">
                            No hay modulos existentes
                          </p>
                        </div>
                      )}
                    </section>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p>No hay modalidades existentes</p>
            )}
          </main>
        </section>

        <section></section>
      </main>
    </>
  )
}
