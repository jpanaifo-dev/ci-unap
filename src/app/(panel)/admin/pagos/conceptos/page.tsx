import { HeaderSection, ListPayConcepts } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Conceptos de pago"
        subtitle="Administrar conceptos de pago"
        isButtonVisible
        labelButton="Nuevo concepto"
        href="/admin/pagos/conceptos/nuevo"
      />
      <main className="py-4">
        <ListPayConcepts />
      </main>
    </>
  )
}
