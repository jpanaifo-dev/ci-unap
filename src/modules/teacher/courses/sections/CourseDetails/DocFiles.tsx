import { IGroup } from '@/types'
import { Divider } from '@nextui-org/react'
import { IconFileLambda, IconChecklist } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_DEV
const urlLocal = process.env.API_URL_PROD

const urlBase = isProduction ? urlProd : urlLocal

interface IProps {
  group: IGroup
}
export const DocFiles = (props: IProps) => {
  const { group } = props
  const pathname = usePathname()

  const isTeacher = pathname.includes('teacher')
  const urlPath = urlBase?.split('/').slice(0, 3).join('/')

  return (
    <>
      <main className="flex flex-col gap-3">
        <section className="pb-2">
          <h2 className="font-bold pb-2">Archivos del grupo</h2>
          <Divider />
        </section>
        <main className="flex flex-col gap-5">
          <section className="flex gap-2 items-start">
            <div>
              <IconChecklist
                size={60}
                stroke={1.5}
                radius={4}
                className="text-gray-500"
              />
            </div>
            <div className="pt-1">
              <h1 className="font-bold text-gray-800">Resolución</h1>
              {group?.resolucion !== '' ? (
                <>
                  <Link
                    href={urlBase + group?.resolucion ?? '#'}
                    target="_blank"
                    className="text-primary-600 underline"
                  >
                    Descargar archivo
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-500">
                    No se ha subido la resolución del grupo.
                  </p>
                </>
              )}
            </div>
          </section>
          <section className="flex gap-2 items-start">
            <div>
              <IconFileLambda
                size={60}
                stroke={1.5}
                radius={4}
                className="text-gray-500"
              />
            </div>
            <div className="pt-1">
              <h1 className="font-bold text-gray-800">Sílabo del curso</h1>
              {group?.silabo ? (
                <>
                  <Link
                    href={urlPath + group?.silabo ?? '#'}
                    target="_blank"
                    className="text-primary-600 underline"
                  >
                    Descargar archivo
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-sm">
                    No se ha subido la resolución del grupo.
                  </p>
                  {isTeacher && (
                    <Link
                      href={`/teacher/cursos/${group?.id}/silabo`}
                      className="text-primary-600 underline"
                    >
                      Subir sílabo
                    </Link>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
      </main>
    </>
  )
}
