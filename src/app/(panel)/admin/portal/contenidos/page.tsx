import { HeaderSection, ListPublicationsFiles } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <HeaderSection
          title="Contenidos de publicaciones"
          subtitle="Gestiona los archivos de las publicaciones que pueden ser subidas (PDF, DOCX, etc)"
          isButtonVisible
          href="/admin/portal/contenidos/nuevo"
          labelButton="Nuevo contenido"
        />
        <section>
          <ListPublicationsFiles />
        </section>
      </main>
    </>
  )
}
