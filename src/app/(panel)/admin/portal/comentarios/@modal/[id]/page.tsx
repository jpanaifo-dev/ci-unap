import { fetchCore } from '@/api'
import { TestimonialModal } from '@/modules/admin'
import { IResApi, ITestimony } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/TestimonioList/?id=${id}`, {
    method: 'GET',
    cache: 'reload',
    next: {
      revalidate: 0.3,
    },
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<ITestimony> = (await res.json()) as IResApi<ITestimony>

  return (
    <>
      <TestimonialModal defaulData={data.results[0]} />
    </>
  )
}
