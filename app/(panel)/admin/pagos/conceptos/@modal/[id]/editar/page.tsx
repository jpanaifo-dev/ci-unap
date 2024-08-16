import { fetchGestor } from '@/api'
import { FrmPayConceptEditor } from '@/modules/admin'
import { ITypePayments } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const res = await fetchGestor(`Concepto/${id}/`, { method: 'GET' })
  if (res.detail) {
    console.error('Error al cargar el nivel')
    return
  }

  const dataLevel: ITypePayments = res as ITypePayments

  return (
    <>
      <FrmPayConceptEditor dataDeafult={dataLevel} />
    </>
  )
}
