import { HeaderSection, ListGroups } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col gap-5 section-panel">
      <HeaderSection
        title="Lista de grupos disponibles"
        subtitle="Grupos disponible de todos los programas"
        isButtonVisible
        href="/admin/cursos/grupos/nuevo"
        labelButton="Añadir grupo"
      />
      <section>
        <ListGroups />
      </section>
    </main>
  )
}
