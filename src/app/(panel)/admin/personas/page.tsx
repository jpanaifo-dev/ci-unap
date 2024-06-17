import { HeaderSection, ListPersons } from '@/modules/admin'

export default async function Page() {
  return (
    <>
      <main className="flex flex-col gap-3">
        <HeaderSection
          title="Lista de personas"
          subtitle="Aquí puedes ver todas las personas que tienes registradas en el sistema"
          isButtonVisible
          href="/admin/personas/nuevo"
          labelButton="Añadir persona"
        />
        <main className="py-4">
          <ListPersons />
        </main>
      </main>
    </>
  )
}
