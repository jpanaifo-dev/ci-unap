import { FrmScoreEditor } from '@/modules/teacher'
import { fetchCore } from '@/api'
import { IResApi, IInscriptions } from '@/types'

interface IProps {
  params: {
    slug: string
  }
}

export default async function Page(props: IProps) {
  const { slug } = props.params
  const res = await fetchCore(`gestor/InscripcionList/?id=${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IInscriptions> =
    (await res.json()) as IResApi<IInscriptions>

  return (
    <main className="flex flex-col gap-3 items-center">
      <FrmScoreEditor defaulData={data.results[0]} />
    </main>
  )
}
