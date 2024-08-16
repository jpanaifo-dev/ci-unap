'use client'
import { Tab, Tabs } from '@nextui-org/react'
import { IPublicationList } from '@/types'
import { PublicationDetails } from './PublicationDetails'
import { PublicationFiles } from './PublicationFiles'

interface IProps {
  data?: IPublicationList
}

export const TabSection = (props: IProps) => {
  const { data: publication } = props

  return (
    <section>
      <Tabs variant="underlined">
        <Tab
          title="Vista previa"
          key={'preview'}
        >
          <section className="flex flex-col gap-3 max-h-[calc(100vh-5rem)] overflow-y-auto section-panel">
            <PublicationDetails data={publication} />
          </section>
        </Tab>
        <Tab
          title="Archivos"
          key={'files'}
        >
          <section className="flex flex-col gap-3 max-h-[calc(100vh-5rem)] overflow-y-auto section-panel">
            <PublicationFiles data={publication} />
          </section>
        </Tab>
      </Tabs>
    </section>
  )
}
