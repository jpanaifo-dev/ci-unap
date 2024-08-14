import { IPerson } from '@/types'
import { InfoData, UserData } from './sections'

interface IProps {
  person: IPerson
}

export const DetailsPerson = (props: IProps) => {
  const { person } = props
  return (
    <main className="w-full flex flex-col items-center gap-3">
      <main className="flex flex-col gap-3 sm:p-4 lg:p-8 w-full max-w-5xl section-panel">
        <InfoData person={person} />
      </main>
      <main className="flex flex-col gap-3  sm:p-4 lg:p-8 w-full max-w-5xl text-sm 2xl:text-base section-panel">
        <UserData person={person} />
      </main>
    </main>
  )
}
