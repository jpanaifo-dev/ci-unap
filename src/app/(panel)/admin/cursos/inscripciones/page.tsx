import { HeaderSection, ListInscriptions } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-5">
        <HeaderSection
          title="Lista de inscripciones"
          subtitle="Lista de inscripciones realizadas"
          isButtonVisible
          href="/admin/cursos/inscripciones/nuevo"
          labelButton="Registrar inscripción"
        />
        <section>
          <ListInscriptions />
        </section>
      </main>
    </>
  )
}
