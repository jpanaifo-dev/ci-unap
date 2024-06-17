import { IPerson } from '@/types'
import { InfoData, UserData } from './sections'

interface IProps {
  person: IPerson
}

export const DetailsPerson = (props: IProps) => {
  const { person } = props
  return (
    <>
      <main className="flex flex-col gap-3 sm:p-4 lg:p-8 border rounded-lg w-full max-w-5xl">
        <InfoData person={person} />
      </main>
      <main className="flex flex-col gap-3  sm:p-4 lg:p-8 border rounded-lg w-full max-w-5xl text-sm 2xl:text-base">
        <UserData person={person} />
      </main>
    </>
  )
}
