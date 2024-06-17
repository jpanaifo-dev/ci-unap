import { FrmAddExpediente, HeaderSection } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IProceeding, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchGestor(`ExpedienteList/?id=${id}`, {
    method: 'GET',
  })

  if (res.detail) {
    console.error('Error al cargar el idioma')
    return
  }

  const data: IResApi<IProceeding> = res as IResApi<IProceeding>

  return (
    <>
      <HeaderSection
        title="Editar expediente"
        subtitle="Modifica los datos del expediente."
      />
      <main className="py-4">
        <FrmAddExpediente data={data.results[0]} />
      </main>
    </>
  )
}
