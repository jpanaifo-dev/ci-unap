import { DetailsPayments, HeaderSection } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IPayments, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const data = await fetchGestor(`PagoList/?id=${id}`, { method: 'GET' })

  if (data?.detail) {
    console.error('Error al cargar el detalle del pago', data.detail)
    return (
      <div>
        <h1>Error al cargar el idioma</h1>
        <p>{data.detail}</p>
      </div>
    )
  }
  const payment: IResApi<IPayments> = data as IResApi<IPayments>

  return (
    <>
      <main className="flex flex-col gap-5 items-center">
        <section className="border p-4 max-w-5xl w-full rounded-lg">
          <header className="w-full">
            <HeaderSection
              title={`Detalle del pago: ${payment.results[0].num_operacion}`}
              subtitle="Aquí podrás ver los detalles del pago seleccionado."
            />
          </header>
          <DetailsPayments defaultData={payment.results[0]} />
        </section>
      </main>
    </>
  )
}
