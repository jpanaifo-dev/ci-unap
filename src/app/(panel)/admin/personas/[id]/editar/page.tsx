import { fetchCore } from '@/api'
import { FrmAddPerson, HeaderSection } from '@/modules/admin'
import { IPerson } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const data = await fetchCore(`gestor/Persona/${id}`, {
    method: 'GET',
    next: {
      revalidate: 2,
    },
  })
  const dataRes: IPerson = await data.json()

  return (
    <>
      <HeaderSection
        title="Editar persona"
        subtitle="Modifica los datos de la persona."
      />
      <main className="py-4 w-full flex flex-col justify-center items-center">
        <FrmAddPerson data={dataRes} />
      </main>
    </>
  )
}
