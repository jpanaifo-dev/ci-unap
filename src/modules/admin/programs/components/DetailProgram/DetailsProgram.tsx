import { ILanguages } from '@/types'
import { Image } from '@nextui-org/react'

interface IProps {
  data?: ILanguages
}

export const DetailsProgram = (prop: IProps) => {
  const { data } = prop

  return (
    <>
      <section className="m-4">
        <div className="p-4 border rounded-lg flex items-start gap-6">
          <section>
            {data?.image ? (
              <Image
                src={data?.image}
                alt={data?.nombre}
                removeWrapper
                className="rounded-full w-52 h-52 object-cover"
              />
            ) : (
              <>
                <div className="h-20 w-80 rounded-full bg-gray-100 border-gray-200">
                  <h1 className="text-sm">
                    No hay imagen disponible para este programa
                  </h1>
                </div>
              </>
            )}
          </section>
          <section className="flex flex-col">
            <div>
              <h2 className="text-lg  text-gray-500">Código</h2>
              <h1 className="text-xl font-semibold">{data?.codigo}</h1>
            </div>
            <div>
              <h2 className="text-lg text-gray-500">Nombre</h2>
              <h1 className="text-2xl font-semibold">{data?.nombre}</h1>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
