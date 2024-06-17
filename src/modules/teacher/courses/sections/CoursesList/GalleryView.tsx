'use client'
import { IGroup, IResApi } from '@/types'
import { CardGalleryCourse } from '@/modules/teacher'

interface IProps {
  resApi: IResApi<IGroup> | null
}
export const GalleryView = (props: IProps) => {
  const { resApi } = props
  return (
    <>
      <section className="grid grid-cols-4 gap-5">
        {resApi !== null &&
          resApi?.results.map((group, index) => (
            <CardGalleryCourse
              key={index}
              group={group}
              path="teacher"
            />
          ))}
      </section>
    </>
  )
}
