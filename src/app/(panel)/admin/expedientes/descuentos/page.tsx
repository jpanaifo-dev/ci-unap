import { HeaderSection, ListDiscounts } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-5">
        <HeaderSection
          title="Descuentos"
          subtitle="En esta sección puedes ver y editar los descuentos que se aplican a los expedientes."
          isButtonVisible
          href="/admin/expedientes/descuentos/nuevo"
          labelButton="Nuevo descuento"
        />
        <ListDiscounts />
      </main>
    </>
  )
}
