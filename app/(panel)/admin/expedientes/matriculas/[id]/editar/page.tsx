import { FrmEnrollmentEditor, HeaderSection } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IEnrollment, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchGestor(`MatriculaList/?id=${id}`, {
    method: 'GET',
  })

  if (res.detail) {
    console.error('Error al cargar la matricula')
    return
  }

  const data: IResApi<IEnrollment> = res as IResApi<IEnrollment>

  return (
    <main className="flex flex-col gap-4 items-center ">
      <section className="w-full max-w-3xl">
        <FrmEnrollmentEditor data={data.results[0]} />
      </section>
    </main>
  )
}
