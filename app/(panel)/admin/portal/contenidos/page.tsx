import { HeaderSection, ListPublicationsFiles } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col gap-4 section-panel">
      <HeaderSection
        title="Contenidos de publicaciones"
        subtitle="Gestiona los archivos de las publicaciones que pueden ser subidas (PDF, JPG, etc), Estos archivos serán parte de las publicaciones que se mostrarán en el portal."
        isButtonVisible
        href="/admin/portal/contenidos/nuevo"
        labelButton="Nuevo contenido"
      />
      <section>
        <ListPublicationsFiles />
      </section>
    </main>
  )
}
