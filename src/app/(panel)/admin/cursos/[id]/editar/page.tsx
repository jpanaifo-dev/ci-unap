import { fetchCore } from '@/api'
import { FrmAddModule } from '@/modules/admin'
import { IModule } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/Modulo/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IModule = (await res.json()) as IModule

  return (
    <>
      <FrmAddModule data={data} />
    </>
  )
}
