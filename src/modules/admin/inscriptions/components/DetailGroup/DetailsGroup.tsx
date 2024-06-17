import { IGroup } from '@/types'
import { Chip, Divider, Link } from '@nextui-org/react'
import { decodeAction } from 'next/dist/server/app-render/entry-base'

interface IProps {
  defaultData: IGroup
}

export const DetailsGroup = (props: IProps) => {
  const { defaultData } = props
  return (
    <main className="w-full border max-w-6xl p-4 rounded-lg flex flex-col gap-4">
      <header>
        <div>
          <Chip
            variant="flat"
            radius="sm"
            color={defaultData?.is_active ? 'success' : 'danger'}
          >
            {defaultData?.is_active ? 'Activo' : 'Inactivo'}
          </Chip>
          <h1 className="font-bold text-2xl">
            Detalles del grupo {defaultData.grupo}
          </h1>
        </div>
        <div className="pb-3">
          <p className="text-gray-500 text-sm font-bold">
            Resolución: {defaultData.resolucion}
          </p>
        </div>
        <Divider />
      </header>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <h2>Aforo</h2>
        <p>: {defaultData?.aforo}</p>
        <h2>Adj. Resolución</h2>
        <Link
          href={defaultData?.adjunto_resolucion ?? '#'}
          target="_blank"
          size="sm"
          showAnchorIcon
        >
          : Ver archivo
        </Link>
        <h2>Fecha de inicio</h2>
        <p>: {defaultData?.fecha_inicio}</p>
        <h2>Fecha Final</h2>
        <p>: {defaultData?.fecha_final}</p>
        <h2>Silabo</h2>
        <Link
          href={defaultData?.silabo ?? '#'}
          target="_blank"
          size="sm"
          showAnchorIcon
        >
          : Ver archivo
        </Link>
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <h2>Modulo</h2>
        <p>: {defaultData?.modulo?.nombre}</p>
        <h2>Nivel</h2>
        <p>: {defaultData?.modulo?.nivel?.nombre}</p>
        <h2>Modalidad</h2>
        <p>: {defaultData?.modulo?.modalidad?.nombre}</p>
        <h2>Docente</h2>
        <p>
          :{' '}
          {defaultData?.docente?.persona?.nombres +
            ' ' +
            defaultData?.docente?.persona?.apellido_paterno +
            ' ' +
            defaultData?.docente?.persona?.apellido_materno}
        </p>
        <h2>Correo del docente</h2>
        <p>: {defaultData?.docente?.persona?.correo}</p>
        <h2>Celular docente</h2>
        <p>: {defaultData?.docente?.persona?.celular ?? 'No registrado'}</p>
      </section>
    </main>
  )
}
