import { HeaderSection, ListModalities } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col gap-4 section-panel">
      <HeaderSection
        title="Lista de modalidades"
        subtitle="Modalidades de los cursos de idiomas"
        isButtonVisible
        href="/admin/idiomas/modalidades/nuevo"
        labelButton="Añadir modalidad"
      />
      <section>
        <ListModalities />
      </section>
    </main>
  )
}
