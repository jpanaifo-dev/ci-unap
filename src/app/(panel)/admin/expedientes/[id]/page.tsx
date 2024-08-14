import { fetchGestor } from '@/api'
import { DetailsExpediente, HeaderSection } from '@/modules/admin'
import { IProceeding, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const resExp = await fetchGestor(`ExpedienteList/?id=${id}`, {
    method: 'GET',
  })

  if (resExp?.detail) {
    return (
      <>
        <div className="p-4">
          <h1 className="text-lg font bold">Error al optener el expediente</h1>
        </div>
      </>
    )
  }

  const dataExp = resExp as IResApi<IProceeding>

  return (
    <>
      <main className="flex flex-col items-center gap-6">
        <section className="w-full max-w-6xl border p-6 rounded-xl flex flex-col gap-6 section-panel">
          <HeaderSection
            title={`Detalles del expediente N°` + ` ${dataExp.results[0].id}`}
            subtitle="Detalles del expediente."
          />
          <main className="flex flex-col gap-4">
            <DetailsExpediente dataExp={dataExp.results[0]} />
          </main>
        </section>
      </main>
    </>
  )
}
