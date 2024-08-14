import { HeaderSection, ListCourses } from '@/modules/admin'

export default async function Page() {
  return (
    <main className="flex flex-col gap-3 section-panel">
      <HeaderSection
        title="Lista de cursos"
        subtitle="Nivel - Modalidad - Horario"
        isButtonVisible
        href="/admin/cursos/nuevo"
        labelButton="Añadir curso"
      />
      <main className="py-4">
        <ListCourses />
      </main>
    </main>
  )
}
