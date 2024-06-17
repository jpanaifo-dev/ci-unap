import { FrmAddPerson, HeaderSection } from '@/modules/admin'

export default async function Page() {
  return (
    <>
      <HeaderSection
        title="Nuevo persona"
        subtitle="Agrega un nuevo persona al sistema."
      />
      <main className="py-4 w-full flex flex-col justify-center items-center">
        <FrmAddPerson />
      </main>
    </>
  )
}
