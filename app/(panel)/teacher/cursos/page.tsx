import { HeaderSection } from '@/modules/admin'
import { RightContentHeader, TeacherCoursesList } from '@/modules/teacher'
import { IGroup, IResApi } from '@/types'
import { fetchGrupoList } from '@/api'
import { getPersonId } from '@/libs'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, status, page },
  } = props

  let data: IResApi<IGroup> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  const personTeacherId = await getPersonId()

  try {
    const res = await fetchGrupoList({
      docente__persona__id: personTeacherId,
      is_active:
        status === '1'
          ? true
          : status === '0'
          ? false
          : status === '3'
          ? undefined
          : true,
      page: page ? Number(page) : undefined,
      modulo__nombre__icontains: search ? String(search) : undefined,
    })

    if (res.ok) {
      data = (await res.json()) as IResApi<IGroup>
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main className="flex flex-col gap-5 section-panel">
      <HeaderSection
        title="Cursos y grupos asignados"
        subtitle="Lista de cursos asignados al docente"
        rigthContent={<RightContentHeader path="teacher" />}
      />
      <TeacherCoursesList groupList={data} />
    </main>
  )
}
