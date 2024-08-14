import { fetchCore } from '@/api'
import { IPerson, IResApi } from '@/types'
import { PersonalData } from '@/modules/core'

import { getPersonId } from '@/libs'

export default async function ProfilePage() {
  const personId = await getPersonId()

  const res = await fetchCore(`gestor/PersonaList/?id=${personId}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IPerson> = (await res.json()) as IResApi<IPerson>

  return (
    <>
      <PersonalData personData={data.results[0]} />
    </>
  )
}
