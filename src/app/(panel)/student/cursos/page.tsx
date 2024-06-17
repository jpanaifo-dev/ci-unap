import { Suspense } from 'react'
import { fetchCore } from '@/api'
import { HeaderSection } from '@/modules/admin'
import { StundentCoursesList } from '@/modules/student'
import { RightContentHeader } from '@/modules/teacher'
import { IInscriptions, IResApi, IResCookie } from '@/types'
import { getCookie } from '@/utils'

const APP_NAME = process.env.APP_NAME || ''

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, page, exp },
  } = props

  const res: IResCookie = (await getCookie(
    `${APP_NAME}_persona_id`
  )) as IResCookie

  const id_persona = res.value
  const query = search || ''
  const currentPage = page || '1'
  const expediente = exp || ''

  const resApi = await fetchCore(
    `gestor/InscripcionList/?matricula__expediente__persona__id=${id_persona}&grupo__modulo__nombre__icontains=${query}&matricula__expediente__id=${expediente}&page=${currentPage}`,
    { method: 'GET', cache: 'no-cache' }
  )

  if (!resApi.ok) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderSection
          title="Cursos y grupos asignados"
          subtitle="Lista de cursos asignados al docente"
        />
        <main className="flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-bold">Error al cargar los cursos</h1>
          </div>
        </main>
      </Suspense>
    )
  }

  const data: IResApi<IInscriptions> =
    (await resApi.json()) as IResApi<IInscriptions>

  return (
    <main className="flex flex-col gap-5">
      <HeaderSection
        title="Cursos y grupos asignados"
        subtitle="Lista de cursos asignados al docente"
        rigthContent={
          <RightContentHeader
            path="student"
            isTable={false}
          />
        }
      />
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <StundentCoursesList listInscription={data} />
        </Suspense>
      </section>
    </main>
  )
}
