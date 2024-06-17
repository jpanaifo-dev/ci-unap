import { HeaderSection, ListPrograms } from '@/modules/admin'

export default async function Page() {
  return (
    <>
      <main className="flex flex-col gap-3">
        <HeaderSection
          title="Lista de idiomas"
          subtitle="Aquí puedes ver todos los idiomas que tienes registrados en la plataforma."
          isButtonVisible
          href="/admin/idiomas/nuevo"
          labelButton="Añadir idioma"
        />
        <main className="py-4">
          <ListPrograms />
        </main>
      </main>
    </>
  )
}
