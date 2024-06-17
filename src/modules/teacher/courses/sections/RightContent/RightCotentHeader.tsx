'use client'
import { Button, ButtonGroup } from '@nextui-org/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { IconLayoutGrid, IconListDetails, IconTable } from '@tabler/icons-react'

const size = 16
interface IProps {
  path: string
  isTable?: boolean
}

export const RightContentHeader = (props: IProps) => {
  const { path, isTable = true } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const isView = (view: string) => {
    if (view === 'gallery' && !searchParams.get('view')) {
      return true
    }
    return searchParams.get('view') === view
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <>
      <div>
        <ButtonGroup
          size="sm"
          radius="sm"
        >
          <Button
            onPress={() => handleNavigate(`/${path}/cursos`)}
            startContent={<IconLayoutGrid size={size} />}
            className={isView('gallery') ? 'button-dark' : ''}
          >
            Galeria
          </Button>
          <Button
            onPress={() => handleNavigate(`/${path}/cursos?view=list`)}
            startContent={<IconListDetails size={size} />}
            className={isView('list') ? 'button-dark' : ''}
          >
            Lista
          </Button>
          {isTable && (
            <Button
              onPress={() => handleNavigate(`/${path}/cursos?view=table`)}
              startContent={<IconTable size={size} />}
              className={isView('table') ? 'button-dark' : ''}
            >
              Tabla
            </Button>
          )}
        </ButtonGroup>
      </div>
    </>
  )
}
