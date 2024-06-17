import { FrmAddProgram, HeaderSection } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { ILanguages } from '@/types'
import { Suspense } from 'react'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const data = await fetchGestor(`Programa/${id}/`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (data?.detail) {
    console.error('Error al cargar el idioma')
    return
  }
  const dataProgram: ILanguages = data as ILanguages
  return (
    <>
      <main className="flex flex-col gap-5">
        <HeaderSection
          title="Editar idioma"
          subtitle="Edita un idioma del sistema"
        />
        <Suspense>
          <FrmAddProgram data={dataProgram} />
        </Suspense>
      </main>
    </>
  )
}
