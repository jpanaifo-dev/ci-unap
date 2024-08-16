'use client'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

interface IProps {
  title: string
  description: string
  isButton?: boolean
  isDownload?: boolean
  labelButton?: string
  path?: string
}

export const HeaderPage = (props: IProps) => {
  const { title, description, isDownload, labelButton, isButton, path } = props

  return (
    <>
      <header className="pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div>
          {isButton && (
            <Button
              radius="sm"
              color="success"
              className="text-white"
              as={Link}
              href={path || '#'}
              download={isDownload}
              size="sm"
            >
              {labelButton || 'Descargar'}
            </Button>
          )}
        </div>
      </header>
    </>
  )
}
