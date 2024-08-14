import { HeaderSection } from '@/modules/admin'
import { StundentCoursesList } from '@/modules/student'
import { RightContentHeader } from '@/modules/teacher'
import { IInscriptions, IResApi } from '@/types'

import { fetchInscripcionList } from '@/api'
import { getPersonId } from '@/libs'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, page, exp },
  } = props

  let data: IResApi<IInscriptions> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  const id_persona = await getPersonId()

  try {
    const res = await fetchInscripcionList({
      matricula__expediente__persona__id: id_persona,
      matricula__expediente__id: exp ? Number(exp) : undefined,
      grupo__modulo__nombre__icontains: search ? String(search) : undefined,
      page: page ? Number(page) : undefined,
    })

    if (res.ok) {
      data = await res.json()
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <main className="flex flex-col gap-5 section-panel">
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
        <StundentCoursesList listInscription={data} />
      </section>
    </main>
  )
}
