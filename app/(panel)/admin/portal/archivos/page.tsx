import { HeaderSection, ListFiles } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col gap-3 section-panel">
      <HeaderSection
        title="Archivos de recursos para la página web"
        subtitle="Archivos de recursos para la página web"
        isButtonVisible
        href="/admin/portal/archivos/nuevo"
        labelButton="Añadir nuevo"
      />
      <ListFiles />
    </main>
  )
}
