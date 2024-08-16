import { HeaderSection, ListDiscounts } from '@/modules/admin'

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-4 section-panel">
      <HeaderSection
        title="Descuentos"
        subtitle="En esta sección puedes ver y editar los descuentos que se aplican a los expedientes."
        isButtonVisible
        href="/admin/pagos/descuentos/nuevo"
        labelButton="Nuevo descuento"
      />
      <ListDiscounts />
    </main>
  )
}
