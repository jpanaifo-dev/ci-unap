'use client'

import { useStudentInscription } from '@/modules/student'
import { IInscriptions } from '@/types'
import { useEffect } from 'react'

export const SyllabusSection = () => {
  // const expedient = 2

  // useEffect(() => {
  //   getInscriptionByExpedientId(expedient)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const expedients: IInscriptions[] =
  //   listInscription?.results || ([] as IInscriptions[])

  return (
    <div>
      <h1 className="text-3xl font-bold pb-4">Silabos</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {expedients.map((item) => (
          <CardSyllabus
            key={item.id}
            title={item.grupo?.modulo?.nombre}
            description={item.grupo?.resolucion}
            downloadLink={item.grupo?.silabo || 'example.com'}
          />
        ))} */}
      </div>
    </div>
  )
}
