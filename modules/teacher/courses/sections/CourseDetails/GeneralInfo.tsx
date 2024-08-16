import { IGroup } from '@/types'
import { Divider } from '@nextui-org/react'

interface IProps {
  group: IGroup
}
export const GeneralInfo = (props: IProps) => {
  const { group } = props
  return (
    <main className="flex flex-col gap-2 ">
      <section className="">
        <h2 className="font-bold">Información general</h2>
      </section>
      <Divider />
      <section className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">
            Fecha de apertura
          </h2>
          <p className="text-gray-500">: {group?.fecha_inicio}</p>
        </div>
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">
            Fecha de cierre
          </h2>
          <p className="text-gray-500">:{group?.fecha_final}</p>
        </div>
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">Grupo</h2>
          <p className="text-gray-500">: {group?.grupo}</p>
        </div>
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">Nivel</h2>
          <p className="text-gray-500">: {group?.modulo?.nivel?.nombre}</p>
        </div>
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">
            Modalidad
          </h2>
          <p className="text-gray-500">: {group?.modulo?.modalidad?.nombre}</p>
        </div>
        <div className="flex gap-6">
          <h2 className="font-semibold max-w-32 w-full text-gray-700">Aforo</h2>
          <p className="text-gray-500">: {group?.aforo} alumnos</p>
        </div>
        <div className="flex gap-6 text-gray-700">
          <h2 className="font-semibold max-w-32 w-full">Resolución</h2>
          <p className="text-gray-500">: {group?.resolucion}</p>
        </div>
      </section>
    </main>
  )
}
