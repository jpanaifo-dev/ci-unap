import { fetchCore } from '@/api'
import { FrmAddModule } from '@/modules/admin'
import { IModule, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/ModuloList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const resData: IResApi<IModule> = (await res.json()) as IResApi<IModule>
  const data = resData.results[0]

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <FrmAddModule data={data} />
    </main>
  )
}
