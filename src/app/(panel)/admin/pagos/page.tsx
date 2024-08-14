import { HeaderSection, ListPayments, UpPaymetsSection } from '@/modules/admin'

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-4 section-panel">
      <HeaderSection
        title="Pagos"
        subtitle="Administrar pagos"
        isButtonVisible
        labelButton="Nuevo pago"
        href="/admin/pagos/nuevo"
        rigthContent={<UpPaymetsSection />}
      />
      <ListPayments />
    </main>
  )
}
