import { fetchCore } from '@/api'
import { FrmDiscountEditor } from '@/modules/admin'
import { IDiscount } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/Descuento/${id}/`, {
    method: 'GET',
  })

  if (!res.ok) {
    return {
      notFound: true,
    }
  }

  const data: IDiscount = (await res.json()) as IDiscount

  return (
    <>
      <FrmDiscountEditor defaulData={data} />
    </>
  )
}
