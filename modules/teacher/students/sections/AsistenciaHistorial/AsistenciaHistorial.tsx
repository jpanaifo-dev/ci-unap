import { IAsistencia, IResApi } from '@/types'

interface IProps {
  dataAsistencia: IResApi<IAsistencia>
}

export const AsistenciaHistorial = (props: IProps) => {
  const { dataAsistencia } = props
  const { results } = dataAsistencia
  const {
    inscripcion: {
      expediente: { persona },
    },
  } = results[0]

  console.log(dataAsistencia)

  return (
    <>
      <header className="flex flex-col gap-1">
        <h1 className="uppercase font-bold">Historial de asistencia</h1>
        <p className="text-gray-500 uppercase text-sm">
          Alumno: {persona?.nombres} {persona?.apellido_paterno}{' '}
          {persona?.apellido_materno}
        </p>
      </header>
      <main></main>
    </>
  )
}
