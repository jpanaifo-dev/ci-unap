'use client'
import { CardCount } from '@/modules/admin'
import { ICount } from '@/types'

interface IProps {
  data: ICount
}

export const ListCount = (props: IProps) => {
  const { data } = props
  return (
    <>
      <section className="flex gap-5 w-full items-center">
        <CardCount
          title="Programas"
          count={data?.total_programas}
        />
        <CardCount
          title="Cursos"
          count={data?.total_modulos}
        />
        <CardCount
          title="Alumnos"
          count={data?.total_alumnos}
        />
      </section>
    </>
  )
}
