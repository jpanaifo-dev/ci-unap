/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IPublicationList } from '@/types'
import { usePublicationsFile } from '../../../hooks'
import { Skeleton, Image, Chip, Link, Button } from '@nextui-org/react'

import { IPublicationFile } from '@/types'
import { useFormContext } from 'react-hook-form'
interface IProps {
  data?: IPublicationList
}

export const PublicationFiles = (props: IProps) => {
  const { data } = props
  const { getPublicationsFileList, listPublicationsFiles, loading } =
    usePublicationsFile()
  const { setValue } = useFormContext<IPublicationFile>()

  useEffect(() => {
    if (data) {
      getPublicationsFileList({ publicacion: data.id })
    }
  }, [data])

  const handleSelectedPublicationFile = (item: IPublicationFile) => {
    setValue('id', item.id)
    setValue('descripcion', item.descripcion)
    setValue('link', item.link)
    setValue('archivo', item.archivo)
    setValue('is_portada', item.is_portada)
    setValue('publicacion', item.publicacion)
    setValue('tipo_id', item.tipo.id.toString())
  }

  return (
    <section className="flex flex-col gap-2">
      {loading && (
        <section className="flex flex-col gap-2 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-24 rounded-lg"
            />
          ))}
        </section>
      )}
      {!loading &&
        listPublicationsFiles &&
        listPublicationsFiles?.results?.length > 0 && (
          <div className="flex flex-col gap-2">
            {listPublicationsFiles?.results?.map((item, index) => (
              <section
                key={index}
                className="flex gap-4 items-start"
              >
                <Image
                  src={`https://idiomas.unapiquitos.edu.pe${item.archivo}`}
                  alt={item.descripcion}
                  width={130}
                  height={130}
                  removeWrapper
                  radius="sm"
                  className="w-32 h-28 object-cover"
                />
                <div>
                  <Chip
                    variant="flat"
                    radius="sm"
                    size="sm"
                    color="warning"
                  >
                    {item.tipo.nombre}
                  </Chip>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm text-gray-500 font-medium line-clamp-1">
                      {item.descripcion}
                    </p>
                    <p className="text-sm text-gray-500">
                      Portada de la publicación: {item.is_portada ? 'Sí' : 'No'}
                    </p>
                    {item?.link && (
                      <Link
                        href={item?.link}
                        target="_blank"
                        size="sm"
                        showAnchorIcon
                      >
                        Link de referencia
                      </Link>
                    )}
                    <div>
                      <Button
                        radius="sm"
                        onPress={() => handleSelectedPublicationFile(item)}
                        size="sm"
                        color="primary"
                        variant="light"
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      {!loading &&
        listPublicationsFiles &&
        listPublicationsFiles.results.length === 0 && (
          <p>No hay archivos para mostrar</p>
        )}
    </section>
  )
}
