import { Suspense } from 'react'
import { fetchGestor } from '@/api'
import { HeaderSection } from '@/modules/admin'
import { RightContentHeader, TeacherCoursesList } from '@/modules/teacher'
import { IGroup, IResApi, IResCookie } from '@/types'
import { getCookie } from '@/utils'

const APP_NAME = process.env.APP_NAME || ''

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, status, page },
  } = props

  const is_active = !status ? 'true' : status === '0' ? 'false' : ''

  const res: IResCookie = (await getCookie(
    `${APP_NAME}_persona_id`
  )) as IResCookie

  const id_persona = res.value
  const query = search || ''
  const currentPage = page || '1'

  const response = await fetchGestor(
    `GrupoList/?docente__persona__id=${id_persona}&docente_id=&is_active=${is_active}&modulo__nombre__icontains=${query}&page=${currentPage}`,
    { method: 'GET', cache: 'no-cache' }
  )

  if (response?.detail) {
    return (
      <>
        <HeaderSection
          title="Cursos y grupos asignados"
          subtitle="Lista de cursos asignados al docente"
        />
        <main className="flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-bold">Error al cargar los cursos</h1>
          </div>
        </main>
      </>
    )
  }

  const data = response as IResApi<IGroup>

  return (
    <main className="flex flex-col gap-5">
      <HeaderSection
        title="Cursos y grupos asignados"
        subtitle="Lista de cursos asignados al docente"
        rigthContent={<RightContentHeader path="teacher" />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TeacherCoursesList groupList={data} />
      </Suspense>
    </main>
  )
}
