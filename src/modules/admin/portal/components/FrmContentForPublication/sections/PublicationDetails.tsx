import { IPublicationList } from '@/types'
import { Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import { IconEdit } from '@tabler/icons-react'

interface IProps {
  data?: IPublicationList
}

const renderContent = (content: string) => {
  return (
    <div
      className="custom-quill"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export const PublicationDetails = (props: IProps) => {
  const { data } = props
  const { titulo, contenido, fecha, tipo } = data || {}

  return (
    <main>
      <header className="flex flex-col gap-1">
        <div className="flex justify-between">
          <Chip
            radius="sm"
            size="sm"
            variant="flat"
            color="warning"
          >
            {tipo?.nombre}
          </Chip>
          <div className="flex gap-1">
            <Button
              variant="light"
              color="primary"
              size="sm"
              radius="sm"
              as={Link}
              href={`/admin/portal/publicaciones/${data?.id}/editar`}
              startContent={
                <IconEdit
                  size={16}
                  stroke={1}
                />
              }
            >
              Editar publicación
            </Button>
          </div>
        </div>
        <h1 className="font-bold text-3xl">{titulo}</h1>
      </header>
      <article>
        <h1 className="font-medium">Fecha de publicación</h1>
        <p className="text-gray-500text-sm">{fecha}</p>
      </article>
      <section>{renderContent(contenido || '')}</section>
    </main>
  )
}
