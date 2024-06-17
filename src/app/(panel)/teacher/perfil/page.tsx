import { fetchCore } from '@/api'
import { getCookie } from '@/utils'
import { IPerson, IResApi, IResCookie } from '@/types'
import { PersonalData } from '@/modules/core'

const appName = process.env.APP_NAME

export default async function ProfilePage() {
  const cookie: IResCookie = (await getCookie(
    `${appName}_persona_id`
  )) as IResCookie

  const res = await fetchCore(`gestor/PersonaList/?id=${cookie.value}`, {
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
