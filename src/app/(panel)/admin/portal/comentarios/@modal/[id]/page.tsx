import { FrmDetailsTestimonio } from '@/modules/admin'
import { IResApi, ITestimonyList } from '@/types'
import { fetchTestimonioList } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let testimonio: IResApi<ITestimonyList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchTestimonioList({ id: id })

    if (!res.ok) {
      return <div>Error</div>
    } else {
      testimonio = (await res.json()) as IResApi<ITestimonyList>
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <>
      <FrmDetailsTestimonio defaulData={testimonio.results[0]} />
    </>
  )
}
