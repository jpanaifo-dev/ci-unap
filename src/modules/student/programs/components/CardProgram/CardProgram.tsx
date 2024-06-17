'use client'
import { ILanguages } from '@/types'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD
const urlLocalPath = urlLocal?.slice(0, -4)

const urlBase = isProduction ? urlProd : urlLocalPath

interface IProps {
  language: ILanguages
}

export const CardProgram = (props: IProps) => {
  const { language } = props
  const defaultImage =
    'https://img.freepik.com/foto-gratis/pequeno-globo-mano_23-2147798341.jpg?t=st=1715344761~exp=1715348361~hmac=9013424d77baae6288ab7916798267aa52c905c37fb0f5d6c915095fe92afd1d&w=1380'

  console.log(urlBase)
  const path = urlBase?.slice(0, -1)
  const urlImage = `${path}${language?.image}`

  return (
    <>
      <Card
        key={language.id}
        shadow="none"
        radius="sm"
        isHoverable
      >
        <CardBody className="p-0 w-full min-h-48">
          <main className="flex gap-5 w-full">
            <Image
              src={urlImage ?? defaultImage}
              alt={language.nombre}
              removeWrapper
              className="w-80"
            />
            <main className="p-3 flex flex-col gap-5">
              <section className="flex flex-col gap-2">
                <Chip
                  radius="sm"
                  size="sm"
                  variant="flat"
                  color={language.is_active ? 'success' : 'danger'}
                >
                  {language.is_active ? 'Activo' : 'Inactivo'}
                </Chip>
                <div>
                  <h1 className="text-5xl font-bold uppercase hover:cursor-pointer">
                    {language.nombre}
                  </h1>
                  <h3 className="font-medium text-gray-500">
                    Cod: {language.codigo}
                  </h3>
                </div>
              </section>
            </main>
          </main>
        </CardBody>
      </Card>
    </>
  )
}
