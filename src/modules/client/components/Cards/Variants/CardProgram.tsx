'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
} from '@nextui-org/react'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface IProps {
  name: string
  code: string
  description: string
  image: string
  href: string
}
export const CardProgram = (props: IProps) => {
  const { name, description, image, href, code } = props

  return (
    <>
      <Card
        shadow="none"
        className="w-full"
      >
        <CardBody>
          <Image
            src={image}
            alt={name}
            removeWrapper
            className="w-full object-cover rounded-md h-56"
          />
          <section className="flex flex-col w-ful gap-3 pt-3">
            <section className="flex flex-col gap-1">
              <Chip
                size="sm"
                radius="sm"
                variant="flat"
                color="warning"
              >
                {code}
              </Chip>
              <h1 className="text-2xl font-bold uppercase">{name}</h1>
            </section>
            <p className="line-clamp-3 text-medium">{description}</p>
          </section>
        </CardBody>
        <CardFooter>
          <footer className="flex gap-3 justify-end w-full">
            <Button
              as={Link}
              href={href || ''}
              variant="solid"
              radius="full"
              className="bg-success-800 hover:bg-success-600 text-white"
              endContent={<IconArrowRight size={20} />}
            >
              Ver más
            </Button>
          </footer>
        </CardFooter>
      </Card>
    </>
  )
}
