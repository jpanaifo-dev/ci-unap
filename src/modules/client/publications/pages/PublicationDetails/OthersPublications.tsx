import { CardPublicationList } from '@/modules/client'
import { IPublication, IResApi } from '@/types'
import { Divider } from '@nextui-org/react'

interface IProps {
  publications: IResApi<IPublication>
}
export const OthersPublications = (props: IProps) => {
  const { publications } = props
  return (
    <>
      <section className="flex flex-col gap-3">
        {publications.results.length > 0 && (
          <>
            {publications.results.map((publication, index) => (
              <div key={index}>
                <CardPublicationList publication={publication} />
                <Divider aria-label="divider" />
              </div>
            ))}
          </>
        )}
      </section>
      <section></section>
    </>
  )
}
