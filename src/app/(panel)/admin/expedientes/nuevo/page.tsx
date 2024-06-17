import { FrmAddExpediente, HeaderSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Nuevo Expediente"
        subtitle="Complete los campos para agregar un nuevo expediente"
      />
      <section className="py-4">
        <FrmAddExpediente />
      </section>
    </>
  )
}
