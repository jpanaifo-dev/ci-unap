'use client'
import { IGroup } from '@/types'
import { GeneralInfo } from './GeneralInfo'
import { DocFiles } from './DocFiles'
import { TeacherInfo } from './TeacherInfo'

interface IProps {
  dataGroup: IGroup
}

export const CourseDetails = (props: IProps) => {
  const { dataGroup } = props

  return (
    <section className="flex flex-col gap-5">
      <TeacherInfo teach={dataGroup?.docente} />
      <GeneralInfo group={dataGroup} />
      <DocFiles group={dataGroup} />
    </section>
  )
}
