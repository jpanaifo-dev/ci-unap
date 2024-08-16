import { fetchGestor } from '@/api'
import { FrmAddDocType } from '@/modules/admin'
import { ITypeDoc } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const res = await fetchGestor(`TipoDocumento/${id}/`, { method: 'GET' })
  if (!res.ok) {
    console.error('Error al cargar el nivel')
    return
  }

  const dataTypeDoc: ITypeDoc = res as ITypeDoc

  return (
    <>
      <FrmAddDocType defaulData={dataTypeDoc} />
    </>
  )
}
