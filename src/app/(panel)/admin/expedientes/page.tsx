import { HeaderSection, ListProceeding } from '@/modules/admin'

export default async function Page() {
  return (
    <main className="flex flex-col gap-3 section-panel">
      <HeaderSection
        title="Lista de expedientes"
        subtitle="Expedientes de los alumnos"
        isButtonVisible
        href="/admin/expedientes/nuevo"
        labelButton="Añadir expediente"
      />

      <ListProceeding />
    </main>
  )
}
