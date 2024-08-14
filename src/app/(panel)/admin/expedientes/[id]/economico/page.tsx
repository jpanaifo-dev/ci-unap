import { fetchGestor } from '@/api'
import {
  DetailsExpediente,
  HeaderSection,
  PaymentsDetails,
} from '@/modules/admin'
import { IPayments, IProceeding, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchGestor(`PagoList/?expediente_id=${id}`, {
    method: 'GET',
  })

  const resExp = await fetchGestor(`ExpedienteList/?id=${id}`, {
    method: 'GET',
  })

  if (res?.detail) {
    return (
      <>
        <div className="p-4">
          <h1 className="text-lg font bold">
            Error al optener los detalles economicos
          </h1>
        </div>
      </>
    )
  }

  const data: IResApi<IPayments> = res as IResApi<IPayments>
  const dataExp = resExp as IResApi<IProceeding>

  return (
    <>
      <main className="flex flex-col items-center gap-6">
        <section className="w-full max-w-6xl border p-6 rounded-xl flex flex-col gap-6 section-panel">
          <HeaderSection
            title="Detalles económicos"
            subtitle="Detalles económicos del expediente."
          />
          <main className='flex flex-col gap-4'>
            <DetailsExpediente dataExp={dataExp.results[0]} />
            <PaymentsDetails payments={data} />
          </main>
        </section>
      </main>
    </>
  )
}
