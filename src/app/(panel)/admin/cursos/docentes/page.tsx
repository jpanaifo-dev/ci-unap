import { HeaderSection, ListTeachers } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <HeaderSection
        title="Lista de docentes"
        subtitle="Lista de docentes que imparten cursos en la plataforma"
        isButtonVisible
        href="/admin/cursos/docentes/nuevo"
        labelButton="Añadir docente"
      />
      <main className="py-4">
        <ListTeachers />
      </main>
    </main>
  )
}
