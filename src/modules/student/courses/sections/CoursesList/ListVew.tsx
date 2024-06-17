import { IInscriptions, IResApi } from '@/types'
import { CardListCourse } from '@/modules/teacher'

interface IProps {
  resApi: IResApi<IInscriptions> | null
  loading?: boolean
}
export const ListView = (props: IProps) => {
  const { resApi, loading } = props
  return (
    <>
      <section className="grid grid-cols-1 gap-5">
        {resApi !== null &&
          resApi?.results.map((group, index) => (
            <CardListCourse
              key={index}
              group={group.grupo}
              path="student"
            />
          ))}
      </section>
    </>
  )
}
