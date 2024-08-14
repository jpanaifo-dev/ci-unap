import { FrmAddPerson, HeaderSection } from '@/modules/admin'

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="section-panel flex flex-col gap-4 max-w-6xl w-full">
        <HeaderSection
          title="Nuevo persona"
          subtitle="Agrega un nuevo persona al sistema."
        />
        <FrmAddPerson />
      </section>
    </main>
  )
}
