import { fetchCore } from '@/api'
import { Becas } from '@/modules/client'
import { IDiscount, IResApi } from '@/types'

export default async function BecasPage() {
  const data = await fetchCore('gestor/Descuento', {
    method: 'GET',
  })

  if (!data.ok) {
    return (
      <div className="h-screen max-h-60">
        <h1>
          No se pudo cargar la información de las becas y descuentos. Inténtalo
          más tarde.
        </h1>
      </div>
    )
  }

  const becas: IResApi<IDiscount> = (await data.json()) as IResApi<IDiscount>

  return (
    <>
      <Becas discounts={becas} />
    </>
  )
}
