import { HeaderSection, ListPublications } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <HeaderSection
          title="Lista de publicaciones"
          subtitle="Gestiona las publicaciones que se muestran en la página web"
          isButtonVisible
          href="/admin/portal/publicaciones/nuevo"
          labelButton="Nueva publicación"
        />
        <section>
          <ListPublications />
        </section>
      </main>
    </>
  )
}
