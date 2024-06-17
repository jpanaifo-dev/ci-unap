import { ITeach } from '@/types'
import { Divider } from '@nextui-org/react'
import { IconSchool } from '@tabler/icons-react'

interface IProps {
  teach: ITeach
}

export const TeacherInfo = (props: IProps) => {
  const { teach } = props
  return (
    <main className="flex flex-col gap-2 ">
      <section className="">
        <h2 className="font-bold">Docente</h2>
      </section>
      <Divider />
      <section className="flex gap-3 items-start">
        <div>
          <IconSchool
            size={60}
            stroke={1.5}
            radius={4}
            className="text-gray-500"
          />
        </div>
        <div className="flex flex-col gap-1 pt-2">
          <h1 className="font-semibold uppercase">{`${teach?.persona?.nombres} ${teach?.persona?.apellido_paterno} ${teach?.persona?.apellido_materno}`}</h1>
          {/* <h2>{teach?.persona?.numero_documento}</h2> */}
          <p className="text-sm text-gray-500">{teach?.persona?.correo}</p>
          <p className="text-sm text-gray-500"> {teach?.persona?.celular}</p>
        </div>
      </section>
    </main>
  )
}
