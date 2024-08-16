import { fetchCore } from '@/api'
import { DetailsPerson } from '@/modules/admin'
import { IPerson, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const data = await fetchCore(`gestor/PersonaList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })
  const dataRes: IResApi<IPerson> = (await data.json()) as IResApi<IPerson>

  return (
    <>
      <main className="py-4 w-full flex flex-col justify-center items-center gap-4">
        <DetailsPerson person={dataRes.results[0]} />
      </main>
    </>
  )
}
