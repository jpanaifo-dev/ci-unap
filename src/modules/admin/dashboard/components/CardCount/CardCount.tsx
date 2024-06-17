'use client'
import {
  //   Button,
  Card,
  CardBody,
} from '@nextui-org/react'
import { IconCircleDot } from '@tabler/icons-react'
// import Link from 'next/link'
import { CountDisplay } from '@/modules/admin'

interface IProps {
  title: string
  count: number
}

export const CardCount = (props: IProps) => {
  const { title, count } = props

  return (
    <>
      <Card
        shadow="md"
        radius="md"
        className="border max-w-sm w-full"
      >
        <CardBody>
          <div className="p-3 flex justify-between w-full">
            <section className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <IconCircleDot size={18} />
                <h3 className="font-medium text-sm">Total</h3>
              </div>
              <h1 className="text-xl font-bold">{title}</h1>
            </section>
            <section className="">
              {count && <CountDisplay value={count} />}
            </section>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
