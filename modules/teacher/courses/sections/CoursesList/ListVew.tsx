'use client'
import { IGroup, IResApi } from '@/types'
import { CardListCourse } from '@/modules/teacher'

interface IProps {
  resApi: IResApi<IGroup> | null
}
export const ListView = (props: IProps) => {
  const { resApi } = props
  return (
    <>
      <section className="grid grid-cols-1 gap-5">
        {resApi !== null &&
          resApi?.results.map((group, index) => (
            <CardListCourse
              key={index}
              group={group}
              path="teacher"
            />
          ))}
      </section>
    </>
  )
}
