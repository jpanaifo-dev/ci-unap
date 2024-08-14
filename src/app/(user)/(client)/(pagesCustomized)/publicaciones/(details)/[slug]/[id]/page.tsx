import { fetchCore } from '@/api'
import { PublicationDetails } from '@/modules/client'
import { IPublication, IPublicationFile, IResApi } from '@/types'
import type { Metadata } from 'next'

interface IProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  // read route params
  const id = params.id

  const res = await fetchCore(`portal/PublicacionList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  const resFiles = await fetchCore(
    `portal/PublicacionFile/?publicacion=${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )

  if (!res.ok) {
    return {
      title: `Publicacion | No encontrado`,
      description: 'Publicación no encontrada',
    }
  }

  const publicationFiles: IResApi<IPublicationFile> =
    (await resFiles.json()) as IResApi<IPublicationFile>

  const publicacion: IResApi<IPublication> =
    (await res.json()) as IResApi<IPublication>

  let openGraph = {}

  if (publicacion.results.length === 0) {
    openGraph = {
      title: `Publicacion | No encontrado`,
      description: 'Publicación no encontrada',
    }
  } else {
    openGraph = {
      title: `${publicationFiles.results[0].descripcion} | ${publicacion.results[0].titulo}`,
      description: 'Conoce está publicación de CIUNAP',
      type: 'website',
      locale: 'es_ES',
      // url: `https://www.ciunap.edu.ec/publicaciones/${publicacion.results[0].tipo.nombre}/${id}`,
      images: [`${publicationFiles.results[0].archivo ?? ''}`],
    }
  }

  return {
    // title: `${publicacion.results[0].tipo.nombre} | ${publicacion.results[0].titulo}`,
    description: 'Conoce está publicación de CIUNAP',
    openGraph: openGraph,
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/PublicacionList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  const resFiles = await fetchCore(
    `portal/PublicacionFile/?publicacion=${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )

  if (res.status !== 200) {
    return <div>error</div>
  }

  if (resFiles.status !== 200) {
    return <div>error</div>
  }

  const publication: IResApi<IPublication> =
    (await res.json()) as IResApi<IPublication>

  const publicacionFiles: IResApi<IPublicationFile> =
    (await resFiles.json()) as IResApi<IPublicationFile>

  return (
    <>
      {/* <PublicationDetails
        publication={publication.results[0]}
        publicationFiles={publicacionFiles}
      /> */}
    </>
  )
}
