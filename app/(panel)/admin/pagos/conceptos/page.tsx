import { HeaderSection, ListPayConcepts } from '@/modules/admin'

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-4 section-panel">
      <HeaderSection
        title="Conceptos de pago"
        subtitle="Administrar conceptos de pago"
        isButtonVisible
        labelButton="Nuevo concepto"
        href="/admin/pagos/conceptos/nuevo"
      />
      <ListPayConcepts />
    </main>
  )
}
