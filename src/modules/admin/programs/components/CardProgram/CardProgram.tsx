'use client'
import { ILanguages } from '@/types'
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { IconDotsVertical } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  language: ILanguages
}

export const CardProgram = (props: IProps) => {
  const { language } = props

  return (
    <>
      <Card
        key={language.id}
        shadow="none"
        radius="sm"
        className="border"
      >
        <CardBody>
          <div className="p-3">
            <section className="flex justify-between items-center">
              <h3 className="font-medium text-sm">Cod: {language.codigo}</h3>
              <div className="flex gap-2">
                {/* <IconWorld
                  size={20}
                  className="text-gray-500"
                /> */}
                <Dropdown
                  size="sm"
                  radius="sm"
                  as={Link}
                >
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      size="sm"
                      isIconOnly
                    >
                      <IconDotsVertical
                        size={20}
                        className="text-gray-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem href={`/admin/idiomas/${language.id}`}>
                      Detalles
                    </DropdownItem>
                    <DropdownItem href={`/admin/idiomas/${language.id}/editar`}>
                      Editar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </section>
            <section>
              <h1 className="text-xl font-bold">{language.nombre}</h1>
              <p className="text-gray-400 text-xs">
                {language.is_active ? 'Activo' : 'Inactivo'}
              </p>
            </section>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
