import { HeaderSection, ListPayments, UpPaymetsSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Pagos"
        subtitle="Administrar pagos"
        isButtonVisible
        labelButton="Nuevo pago"
        href="/admin/pagos/nuevo"
        rigthContent={<UpPaymetsSection />}
      />
      <main className="py-4">
        <ListPayments />
      </main>
    </>
  )
}
