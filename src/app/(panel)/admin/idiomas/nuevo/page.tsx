import { FrmAddProgram, HeaderSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Nuevo idioma"
        subtitle="Agrega un nuevo idioma al sistema"
      />
      <main className="pt-4">
        <FrmAddProgram />
      </main>
    </>
  )
}
