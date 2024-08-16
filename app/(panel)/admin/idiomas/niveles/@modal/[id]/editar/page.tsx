import { fetchGestor } from '@/api'
import { FrmAddLevel, HeaderSection } from '@/modules/admin'
import { ILevel } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const res = await fetchGestor(`Nivel/${id}/`, { method: 'GET' })
  if (res.detail) {
    console.error('Error al cargar el nivel')
    return
  }

  const dataLevel: ILevel = res as ILevel

  return (
    <>
      <FrmAddLevel defaulData={dataLevel} />
    </>
  )
}
