'use client'
import { IGroup } from '@/types'
import { IconCalendarMonth } from '@tabler/icons-react'

interface IProps {
  groupData?: IGroup
}

export const CourseRange = (props: IProps) => {
  const { groupData } = props
  const { grupo, fecha_inicio, fecha_final } = groupData || ({} as IGroup)

  //sumar 5 dias a la fecha de inicio
  const fechaNotas = new Date(fecha_inicio)
  fechaNotas.setDate(fechaNotas?.getDate() + 5)

  //sumar 7 dias a la fecha de inicio
  const fechaActas = new Date(fecha_inicio)
  fechaActas.setDate(fechaActas?.getDate() + 7)

  //sumar 3 dias a la fecha de actas
  const fechaActasFinal = new Date(fechaActas)
  fechaActasFinal.setDate(fechaActasFinal?.getDate() + 3)

  return (
    <>
      <main className="flex flex-col gap-5">
        <section className="bg-success-50 p-4 rounded-lg border-l-8 border-success-500">
          <div className="flex gap-3 justify-start">
            <div>
              <IconCalendarMonth
                size={56}
                stroke={1.5}
                className="text-success-500"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">Duración del grupo {grupo}</h1>
              <span className="text-sm">
                Desde {fecha_inicio} al {fecha_final}
              </span>
            </div>
          </div>
        </section>
        <section className="bg-success-50 p-4 rounded-lg border-l-8 border-success-500">
          <div className="flex gap-3 justify-start">
            <div>
              <IconCalendarMonth
                size={56}
                stroke={1.5}
                className="text-success-500"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">Fechas para subir las notas</h1>
              <span className="text-sm">
                Desde {fecha_inicio} al{' '}
                {fechaNotas?.toISOString().split('T')[0]}
              </span>
            </div>
          </div>
        </section>
        <section className="bg-success-50 p-4 rounded-lg border-l-8 border-success-500">
          <div className="flex gap-3 justify-start">
            <div>
              <IconCalendarMonth
                size={56}
                stroke={1.5}
                className="text-success-500"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                Fechas para publicar las actas
              </h1>
              <span className="text-sm">
                Desde {fechaActas?.toISOString().split('T')[0]} al{' '}
                {fechaActasFinal?.toISOString().split('T')[0]}
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
