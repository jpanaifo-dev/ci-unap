import { HeaderSection, ListTypeDocuments } from '@/modules/admin'

export default async function Page() {
  return (
    <main className="flex flex-col gap-6">
      <HeaderSection
        title="Tipos de documentos"
        subtitle="Aquí puedes ver los tipos de documentos que se han registrado en el sistema."
        isButtonVisible
        labelButton="Agregar tipo"
        href="/admin/personas/documentos/nuevo"
      />
      <ListTypeDocuments />
    </main>
  )
}
