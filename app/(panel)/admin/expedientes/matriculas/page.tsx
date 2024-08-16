import { HeaderSection, ListEnrollments } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4 section-panel">
        <HeaderSection
          title="Listado de matriculas"
          subtitle="Listado de matriculas"
          isButtonVisible
          labelButton="Crear matricula"
          href="/admin/expedientes/matriculas/nuevo"
        />
        <ListEnrollments />
      </main>
    </>
  )
}
