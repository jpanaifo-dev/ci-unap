import { HeaderSection, ListLevels } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-3">
        <HeaderSection
          title="Lista de niveles"
          subtitle="Niveles de los cursos de idiomas"
          isButtonVisible
          href="/admin/idiomas/niveles/nuevo"
          labelButton="Añadir nivel"
        />
        <ListLevels />
      </main>
    </>
  )
}
