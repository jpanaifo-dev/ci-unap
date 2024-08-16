import { IInscriptions } from '@/types'

interface IProps {
  dataInscriptions: IInscriptions
}

export const CourseScore = (props: IProps) => {
  const { dataInscriptions } = props

  return (
    <>
      <main className="flex flex-col items-center w-full">
        <section className="w-full p-12 border rounded-lg max-w-2xl flex flex-col gap-5 justify-center items-center">
          <header className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-500">
              Promedio final del módulo
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Esta es la calificación final del módulo, ten en cuenta que esta
              calificación es un promedio de todas las actividades realizadas en
              el módulo.
            </p>
          </header>
          <h1 className="font-bold text-7xl">
            {dataInscriptions?.promedio !== null
              ? dataInscriptions?.promedio
              : 'Aun no se subieron las notas'}
          </h1>
        </section>
      </main>
    </>
  )
}
