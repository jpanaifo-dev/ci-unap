import { IGroup, IInscriptions, IResApi } from '@/types'
import { CardGalleryCourse } from '@/modules/teacher'

interface IProps {
  resApi: IResApi<IInscriptions> | null
  loading?: boolean
}
export const GalleryView = (props: IProps) => {
  const { resApi, loading } = props
  return (
    <>
      <section className="grid grid-cols-4 gap-5">
        {resApi !== null &&
          resApi?.results.map((group, index) => (
            <CardGalleryCourse
              key={index}
              group={group.grupo}
              path="student"
            />
          ))}
      </section>
    </>
  )
}
