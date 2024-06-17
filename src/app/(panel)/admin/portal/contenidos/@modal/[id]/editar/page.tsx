import { fetchCore } from '@/api'
import { FrmPublicationEditor } from '@/modules/admin'
import { IPublicationFile, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/PublicacionFileList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
    next: {
      revalidate: 0.5,
    },
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IPublicationFile> =
    (await res.json()) as IResApi<IPublicationFile>

  return (
    <>
      <FrmPublicationEditor dataDeafult={data.results[0]} />
    </>
  )
}
