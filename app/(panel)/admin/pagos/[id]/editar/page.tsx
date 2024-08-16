import { FrmPaymentEditor } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IPayments } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const data = await fetchGestor(`Pago/${id}/`, {
    method: 'GET',
    cache: 'no-cache',
    next: {
      revalidate: 2,
    },
  })

  if (data?.detail) {
    console.error('Error al cargar el detalle del pago', data.detail)
    return (
      <div>
        <h1>Error al cargar el idioma</h1>
        <p>{data.detail}</p>
      </div>
    )
  }
  const dataProgram: IPayments = data as IPayments

  return (
    <>
      <main className="flex flex-col gap-5">
        <FrmPaymentEditor dataDeafult={dataProgram} />
      </main>
    </>
  )
}
